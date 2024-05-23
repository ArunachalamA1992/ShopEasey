import {Platform, ToastAndroid, LayoutAnimation, UIManager} from 'react-native';
import {pick} from 'react-native-document-picker';

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
};
export default common_fn;
