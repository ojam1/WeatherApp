import { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  Platform,
  TextInput,
  Image,
  Switch
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import type { GeolocationError } from '@react-native-community/geolocation';

import fonts from '../../../styles/text';
import main from '../../../styles/main';
import getWeather from '../../../hooks/getCurrentWeather';
import styles from './home.styles';
import Weather from '../../atoms/Weather/Weather';
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

  const { data, apiError } = getWeather(location, error);

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

  return (
    <View style={main.screenContainer}>
      <TextInput
        placeholder='Enter City'
        style={[fonts.medium, styles.textInput]}
        inputMode='text'
        onEndEditing={input =>
          setLocation({
            city: input.nativeEvent.text,
            latitude: location.latitude,
            longitude: location.longitude
          })
        }
      />
      {data?.condition && (
        <Weather
          icon={data.condition.icon}
          text={{
            main: data.condition.text,
            temp1: `Feels like: ${data.feelslike_c}°C`,
            temp2: `Actual: ${data.temp_c}°C`
          }}
        />
      )}
    </View>
  );
};
