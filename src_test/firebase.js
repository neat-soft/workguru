import RNfirebase from 'react-native-firebase';

const instance = RNfirebase.initializeApp({
  debug: __DEV__ ? '*' : false,
  errorOnMissingPlayServices: false,
  persistence: true,
});

export default instance;
