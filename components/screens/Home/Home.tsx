import { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import type { GeolocationError } from '@react-native-community/geolocation';

import fonts from '../../../styles/text';
import main from '../../../styles/main';
import getWeather from '../../../hooks/getCurrentWeather';
import Weather from '../../atoms/Weather/Weather';
import getLocation from '../../../hooks/getLocation';
export type Location = { latitude?: number; longitude?: number; city?: string };

export type Error = {
  geoLocationError?: GeolocationError;
  locationPermissionError?: unknown;
};

export default () => {
  const { location: geoLocation, error } = getLocation();
  const [userEnteredlocation, setUserEnteredlocation] =
    useState<Location>(geoLocation);
  const [weatherData, setWeatherData] = useState<any>();

  useEffect(() => {
    setUserEnteredlocation(geoLocation);
  }, [geoLocation]);

  const { data, apiError } = getWeather(
    userEnteredlocation || geoLocation,
    error
  );

  useEffect(() => {
    setWeatherData(data);
  }, [data]);

  return (
    <View style={main.screenContainer}>
      <TextInput
        placeholder='Enter City'
        style={[fonts.medium, main.textInput]}
        inputMode='text'
        onEndEditing={input =>
          setUserEnteredlocation({
            city: input.nativeEvent.text,
            latitude: userEnteredlocation.latitude,
            longitude: userEnteredlocation.longitude
          })
        }
      />
      {weatherData?.current?.condition && (
        <Weather
          date={weatherData?.current?.last_updated.slice(0, 10)}
          icon={weatherData.current.condition.icon}
          text={{
            main: weatherData.current.condition.text,
            temp1: `Feels like: ${weatherData.current.feelslike_c}°C`,
            temp2: `Actual: ${weatherData.current.temp_c}°C`
          }}
        />
      )}
    </View>
  );
};
