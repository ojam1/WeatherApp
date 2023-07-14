import { useMemo, useState, useEffect } from 'react';
import { Location, Error } from '../components/screens/Home/Home';

export default (location: Location, error?: Error): any => {
  const [apiError, setApiError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const query = !!location.city
      ? location.city
      : `${location.latitude},${location.longitude}`;

    const url = `https://api.weatherapi.com/v1/forecast.json?key=1acfb849da30471a925214152230907&q=${query}&days=5&aqi=no&alerts=no`;

    const getData = async () => {
      const response = await fetch(url);

      const result = await response.json();
      if (result.error) {
        setApiError(result.error);
      } else {
        setApiError(undefined);
        setData(result);
      }
    };
    getData();
  }, [location, error]);

  return useMemo(
    () => ({
      data,
      apiError
    }),
    [data, apiError]
  );
};
