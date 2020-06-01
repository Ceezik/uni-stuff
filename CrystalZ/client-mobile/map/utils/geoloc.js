import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';

export const acceptGeoloc = () => {
  // Test pour savoir si l'OS du téléphone est android ou IOS pour demander les droits de géolocalisations
  if (Platform.OS === 'android') {
    requestLocationPermission();
  } else if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
  }

  // Fonction qui demande les droit de géolocalisation sous android
  async function requestLocationPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //alert('You can use the location');
    } else {
      //alert('Location permission denied');
    }
  }
};
