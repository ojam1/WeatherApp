import { View, Text } from 'react-native';

import fonts from '../../../styles/text';
import main from '../../../styles/main';

export default () => (
  <View style={main.screenContainer}>
    <Text style={fonts.large}>Forecast</Text>
  </View>
);
