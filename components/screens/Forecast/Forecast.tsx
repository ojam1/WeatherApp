import { useEffect, useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import type { GeolocationError } from '@react-native-community/geolocation';

import fonts from '../../../styles/text';
import main from '../../../styles/main';
import getWeather from '../../../hooks/getCurrentWeather';
import Weather from '../../atoms/Weather/Weather';
import Error from '../../atoms/Error/Error';
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
      {!!apiError && <Error message={apiError.message as string} />}
      {weatherData?.forecast?.forecastday && (
        <ScrollView horizontal>
          {weatherData?.forecast?.forecastday.map(
            (dayWeather: {
              date: string;
              day: {
                condition: { icon: string; text: any };
                mintemp_c: any;
                maxtemp_c: any;
              };
            }) => (
              <Weather
                date={dayWeather?.date}
                key={dayWeather?.date}
                icon={dayWeather.day.condition.icon}
                text={{
                  main: dayWeather.day.condition.text,
                  temp1: `Minimum: ${dayWeather.day.mintemp_c}°C`,
                  temp2: `Maximum: ${dayWeather.day.maxtemp_c}°C`
                }}
              />
            )
          )}
        </ScrollView>
      )}
    </View>
  );
};
