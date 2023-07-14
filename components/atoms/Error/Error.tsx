import { Text, View } from 'react-native';

import styles from './error.styles';

type Props = {
  message: string;
};

export default ({ message }: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);
