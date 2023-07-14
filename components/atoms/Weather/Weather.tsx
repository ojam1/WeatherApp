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
  date: string;
};

export default ({ icon, text, date }: Props) => {
  const { main, temp1, temp2 } = text;
  
  return (
    <View style={styles.container}>
      <Text style={fonts.small}>{date}</Text>
      <Image source={{ uri: `https:${icon}` }} style={styles.image} />
      <Text style={fonts.small}>{main}</Text>
      <Text style={fonts.small}>{temp1}</Text>
      <Text style={fonts.small}>{temp2}</Text>
    </View>
  );
};
