import {
  Platform,
  ToastAndroid,
  LayoutAnimation,
  UIManager,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {colors} from './hexColor';

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
  locationPermission: () =>
    new Promise(async (resolve, reject) => {
      if (Platform.OS === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            return resolve('granted');
          }
          reject('Permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          return reject(error);
        });
    }),
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
        const [{name, uri}] = await pick();
        return {name, uri};
      } else if (id == 2) {
        return navigation.navigate('Skill');
      } else if (id == 3) {
        return navigation.navigate('basicdetails');
      }
    } catch (err) {}
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
    const bigint = parseInt(hex.slice(1), 16);
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
};
export default common_fn;
