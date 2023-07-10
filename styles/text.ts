import { TextStyle } from 'react-native';
import colours from './colours';

type Font = {
  fontSize: number;
  fontFamily: string;
  letterSpacing: number;
  fontWeight: TextStyle['fontWeight'];
  lineHeight: number;
  color: string;
};

const getLineHeight = (fontSize: number): number => {
  return fontSize <= 24 ? fontSize * 1.5 : fontSize * 1.38;
};

const getFont = (
  fontSize: number,
  fontWeight: TextStyle['fontWeight']
): Font => ({
  fontSize,
  fontFamily: 'sans-serif',
  fontWeight,
  lineHeight: getLineHeight(fontSize),
  color: colours['text'],
  letterSpacing: fontSize * 0.05
});

const fonts = {
  xLarge: getFont(30, '500'),
  large: getFont(24, '500'),
  medium: getFont(20, '400'),
  small: getFont(16, '300'),
  xSmall: getFont(12, '200')
};

export default fonts;
