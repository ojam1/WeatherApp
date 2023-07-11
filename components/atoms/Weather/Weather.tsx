import { Image, Text, View } from 'react-native';

import fonts from '../../../styles/text';
import styles from './weather.styles';

type Props = {
  icon: string;
  text: {
    main: string;
    temp1: string;
    temp2: string;
  };
};

export default ({ icon, text }: Props) => {
  const { main, temp1, temp2 } = text;
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: `https:${icon}` }} style={styles.image} />
      <Text style={fonts.small}>{main}</Text>
      <Text style={fonts.small}>{temp1}</Text>
      <Text style={fonts.small}>{temp2}</Text>
    </View>
  );
};
