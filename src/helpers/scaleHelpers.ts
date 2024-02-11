import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard @5" screen mobile device
const baseWidth = 375;
const baseHeight = 812;

const horizontalScale = (size: number) => (width / baseWidth) * size;
const verticalScale = (size: number) => (height / baseHeight) * size;

export { horizontalScale, verticalScale };
