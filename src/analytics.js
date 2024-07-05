import analytics from '@react-native-firebase/analytics';

export const logEvent = (eventName, params) => {
    analytics().logEvent(eventName, params);
};

export const setUserId = (userId) => {
    analytics().setUserId(userId);
};

export const setUserProperties = (properties) => {
    analytics().setUserProperties(properties);
};