import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ForecastScreen from './components/screens/Forecast/Forecast';
import HomeScreen from './components/screens/Home/Home';

type TabProps = {
  Home: undefined;
  Forecast: undefined;
};

const Tab = createBottomTabNavigator<TabProps>();

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Forecast' component={ForecastScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
