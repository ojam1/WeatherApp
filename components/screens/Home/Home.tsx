import { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  Platform,
  TextInput
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import type { GeolocationError } from '@react-native-community/geolocation';

import fonts from '../../../styles/text';
import main from '../../../styles/main';

type Location =
  | {
      latitude: number;
      longitude: number;
    }
  | { city: string };

type Error = {
  geoLocationError?: GeolocationError;
  locationPermissionError?: unknown;
};

export default () => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0
  });
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const requestLocationPermission = async () => {
      const hasAccess = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      );

      if (!hasAccess) {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
              title: 'Weather App Location Permission',
              message:
                'We need your location access in order to generate location based weather please',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK'
            }
          );
        } catch (error) {
          setError({ locationPermissionError: error });
        }
      }
    };
    if (Platform.OS === 'android') requestLocationPermission();

    Geolocation.getCurrentPosition(
      info => {
        const {
          coords: { latitude, longitude }
        } = info;

        setLocation({ latitude, longitude });
      },
      error => setError({ geoLocationError: error })
    );
  }, []);

  console.log(location, error);
  return (
    <View style={main.screenContainer}>
      <Text style={fonts.xLarge}>Home</Text>
      {error && (
        <TextInput
          placeholder='Enter City'
          style={fonts.medium}
          inputMode='text'
          onEndEditing={input => setLocation({ city: input.nativeEvent.text })}
        />
      )}
    </View>
  );
};
