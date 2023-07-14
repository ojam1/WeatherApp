import { useEffect, useState, useMemo } from 'react';
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import type { GeolocationError } from '@react-native-community/geolocation';

export type Location = { latitude?: number; longitude?: number; city?: string };

export type Error = {
  geoLocationError?: GeolocationError;
  locationPermissionError?: unknown;
};

export default () => {
  const [location, setLocation] = useState<Location>({
    latitude: undefined,
    longitude: undefined
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

  return useMemo(
    () => ({
      location,
      error
    }),
    [location, error]
  );
};
