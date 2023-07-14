import { StyleSheet } from 'react-native';
import fonts from '../../../styles/text';

export default StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: 'red',
    width: '60%',
    padding: 20,
    marginTop: 15
  },
  text: {
    ...fonts.large,
    textAlign: 'center'
  }
});
