import {
  Platform,
  ToastAndroid,
  LayoutAnimation,
  UIManager,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { colors } from './hexColor';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { Media } from '../Global/Media';
import moment from 'moment';
import { useSelector } from 'react-redux';

const common_fn = {
  showToast: msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  },
  Accordion: () => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  },
  AccordionAnimation: () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  },
  // locationPermission: () =>
  //   new Promise(async (resolve, reject) => {
  //     if (Platform.OS === 'ios') {
  //       try {
  //         const permissionStatus = await Geolocation.requestAuthorization(
  //           'whenInUse',
  //         );
  //         if (permissionStatus === 'granted') {
  //           return resolve('granted');
  //         }
  //         reject('Permission not granted');
  //       } catch (error) {
  //         return reject(error);
  //       }
  //     }
  //     return PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     )
  //       .then(granted => {
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           resolve('granted');
  //         }
  //         return reject('Location Permission denied');
  //       })
  //       .catch(error => {
  //         return reject(error);
  //       });
  //   }),

  locationPermission: async () => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
        if (permissionStatus === 'granted') {
          return 'granted';
        }
        return 'denied';
      } catch (error) {
        throw new Error(error);
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return 'granted';
        }
        return 'denied';
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  calculateProfileCompletion: (
    resume,
    skills,
    education,
    experience,
    language,
    gender,
    birthdate,
    marital_status,
    email,
    phone,
    name,
  ) => {
    const totalFields = 13;
    let completedFields = 0;

    if (resume != null && resume?.length > 0) {
      completedFields++;
    }
    if (skills?.length > 0) {
      completedFields++;
    }
    if (education?.length > 0) {
      completedFields++;
    }
    if (experience?.length > 0) {
      completedFields++;
    }
    if (language?.length > 0) {
      completedFields++;
    }
    if (gender?.length > 0) {
      completedFields++;
    }
    if (birthdate?.length > 0) {
      completedFields++;
    }
    if (marital_status?.length > 0) {
      completedFields++;
    }
    if (email?.length > 0) {
      completedFields++;
    }
    if (phone?.length > 0) {
      completedFields++;
    }
    if (name?.length > 0) {
      completedFields++;
    }

    return parseInt((completedFields / totalFields) * 100);
  },
  profileupdate: async (id, navigation) => {
    try {
      if (id == 1) {
        const [{ name, uri }] = await pick();
        return { name, uri };
      } else if (id == 2) {
        return navigation.navigate('Skill');
      } else if (id == 3) {
        return navigation.navigate('basicdetails');
      }
    } catch (err) { }
  },
  formatNumberWithSuffix: amount => {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(2) + ' Cr';
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(2) + ' L';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(2) + ' K';
    } else {
      return parseInt(amount).toFixed(2);
    }
  },
  generateCustomID: customIDCounter => {
    customIDCounter.counter = (customIDCounter.counter || 1) % 10;
    const uniqueID = customIDCounter.counter;
    customIDCounter.counter++;
    return uniqueID;
  },
  hexToRgb: hex => {
    const bigint = parseInt(hex?.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  },
  colorDistance: (color1, color2) => {
    return Math.sqrt(
      Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2),
    );
  },
  getColorName: hexCode => {
    const rgb = common_fn?.hexToRgb(hexCode);
    let minDistance = Infinity;
    let closestColor = 'Unknown Color';
    colors.forEach(color => {
      const colorRgb = common_fn?.hexToRgb(color.hex);
      const distance = common_fn?.colorDistance(rgb, colorRgb);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = color.name;
      }
    });
    return closestColor;
  },
  generatePDF: async (response, countryCode) => {
    var discount = parseFloat(
      100 -
      ((response?.variants?.org_price -
        (response?.variants?.offer_price ?? response?.variants?.price)) /
        response?.variants?.org_price) *
      100,
    ).toFixed(2);

    const discount_price = parseFloat(
      (response.variants?.org_price -
        (response?.variants?.offer_price ?? response.variants?.price)) *
      response?.quantity || 0,
    ).toFixed(2);

    var tax_percent = parseFloat(
      (response?.order?.tax /
        (response?.variants?.offer_price ?? response?.variants?.price)) *
      100,
    ).toFixed(2);

    const tax_amount = parseFloat(
      ((response?.variants?.offer_price ?? response.variants?.price) -
        response.order.tax) *
      response?.quantity || 0,
    ).toFixed(2);

    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
        }
        .invoice-box {
            width: 800px;
            margin: auto;
            padding: 30px;
            background: #fff;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            color: #333;
        }
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            border-collapse: collapse;
        }
        .invoice-box table td {
            padding: 10px;
            vertical-align: top;
        }
        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }
        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }
        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }
        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }
        .invoice-box table tr.heading td {
            background: #0D71BA;
            color: #fff;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            text-align: center;
        }
        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }
        .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
        }
        .invoice-box table tr.item.last td {
            border-bottom: none;
        }
        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }
        .invoice-box .footer {
            margin-top: 30px;
        }
        .invoice-box .footer table {
            width: 100%;
        }
        .invoice-box .footer table td {
            padding: 10px;
            border-top: 1px solid #eee;
            text-align: left;
        }
        .total-due {
            background-color: #0D71BA;
            padding: 10px;
            font-weight: bold;
            color: #fff;
            text-align: right;
            border-radius:5px
        }
        .total-due-box {
            background-color: #0D71BA;
            color: #fff;
            padding: 10px;
            font-weight: bold;
            text-align: right;
            margin-top: 20px;
            font-size: 20px;
        }
        .company-logo {
            width: 100px;
            height: auto;
        }
        .section-title {
            font-weight: bold;
            color: #0D71BA;
            font-size:30px;
        }
        .footer-title {
            font-weight: bold;
            color: #0D71BA;
            font-size:20px;
        }
        .thank-you {
            font-weight: bold;
            color: #0D71BA;
            font-size:25px;
            margin-vertical:10px;
        }
        .header-title {
            font-weight: bold;
            color: #000;
            font-size:25px;
        }
        .highlight {
            color: #0D71BA;
        }
    </style>
</head>
<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="4">
                    <table>
                        <tr>
                            <td class="title">
                                <img src="${Media.logo
      }" alt="Brand Logo" style="width: 100px; max-width: 300px;">
                            </td>
                            <td style="text-align: right;">
                                <div class="section-title highlight">INVOICE</div>
                                <div>${moment(new Date()).format(
        'MMM DD,YYYY',
      )}</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="information">
                <td colspan="4">
                    <table>
                        <tr>
                            <td>
                                <div class="header-title">Office Address</div>
                                13/8 New Colony, 13th Cross Street,<br>
                                near Parvathy Hospital, Lake Area, Mahalakshmi Colony,<br>
                                Chromepet, Tamil Nadu 600044<br>
                                (+91)9629332301
                            </td>
                            <td style="text-align: right;">
                                <div class="header-title">To:</div>
                                ${response?.product?.vendor?.name}<br>
                                ${response?.product?.vendor?.address}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="heading">
                <td>Items Description</td>
                <td>Unit Price</td>
                <td>Qnt</td>
                <td>Total</td>
            </tr>
            <tr class="item">
                <td>${response.products.product_name}</td>
                <td style="text-align: center;">${`${response?.order?.region_id == 454
        ? '$'
        : response?.order?.region_id == 453
          ? 'RM'
          : '₹'
      } ${parseFloat(
        response?.variants?.offer_price
          ? response?.variants?.offer_price
          : response.price,
        // / countryCode?.price_margin,
      ).toFixed(2)}`}</td>
                <td style="text-align: center;">${response.quantity}</td>
                <td style="text-align: right;">${`${response?.order?.region_id == 454
        ? '$'
        : response?.order?.region_id == 453
          ? 'RM'
          : '₹'
      } ${response.order.total}`}</td>
            </tr>
            <tr class="total">
                <td colspan="3" style="text-align: right;color:#0D71BA;font-weight:600">SUBTOTAL:</td>
                <td style="text-align: right;color:#0D71BA;font-weight:600">${`${response?.order?.region_id == 454
        ? '$'
        : response?.order?.region_id == 453
          ? 'RM'
          : '₹'
      } ${response.order.sub_total}`}</td>
            </tr>
            <tr class="total">
                <td colspan="3" style="text-align: right;font-weight:600">Tax ${tax_percent}%:</td>
                <td style="text-align: right;font-weight:600">${`${response?.order?.region_id == 454
        ? '$'
        : response?.order?.region_id == 453
          ? 'RM'
          : '₹'
      } ${response.order.tax}`}</td>
            </tr>
            <tr class="total">
                <td colspan="3" style="text-align: right;font-weight:600">Discount ${discount}%:</td>
                <td style="text-align: right;font-weight:600">${`${response?.order?.region_id == 454
        ? '$'
        : response?.order?.region_id == 453
          ? 'RM'
          : '₹'
      } ${discount_price}`}</td>
            </tr>
            <tr class="total">
                <td colspan="3" style="text-align: right;font-weight:600">Total Amount:</td>
                <td class="total-due">${`${response?.order?.region_id == 454
        ? '$'
        : response?.order?.region_id == 453
          ? 'RM'
          : '₹'
      } ${response.order.total}`}</td>
            </tr>
        </table>
        <div class="footer">
            <div class='thank-you'>Thank you for your Business</div>
            <table>
                <tr>
                    <td>
                        <div class="footer-title">Questions?</div>
                        Contact us at <br>(+91)9629332301 <br>or info@shopeasey.com
                    </td>
                    <td>
                        <div class="footer-title">Payment Info:</div>
                        Payment Gateway: ${response.order.region_id == 452
        ? 'Razorpay'
        : 'Paypal'
      }<br>
                    </td>
                    <td>
                        <div class="footer-title">Terms & Conditions:</div>
                        Payment is due within 30 days.<br>
                        Late fees may apply.
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
    `;

    const options = {
      html: htmlContent,
      fileName: 'invoice',
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    return common_fn.downloadInvoice(file.filePath);
  },
  downloadInvoice: async pdfPath => {
    if (!pdfPath) {
      Alert.alert('Error', 'Please generate the invoice first.');
      return;
    }

    const destPath = `${RNFS.DownloadDirectoryPath}/invoice.pdf`;

    try {
      await RNFS.moveFile(pdfPath, destPath);
      common_fn.showToast(`Invoice downloaded`);
    } catch (error) {
      common_fn.showToast(`Failed to download the invoice`);
    }
  },
  urlToBase64: async url => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting URL to Base64:', error);
      return null;
    }
  },
};
export default common_fn;
