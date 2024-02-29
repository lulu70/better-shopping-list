import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import theme from '../constants/theme';
import { horizontalScale } from '../helpers/scaleHelpers';
const CheckIcon = (props: SvgProps) => (
  <Svg
    testID="CheckIcon"
    width={horizontalScale(theme.spacing.spacing_26)}
    height={horizontalScale(theme.spacing.spacing_26)}
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
  </Svg>
);
export default CheckIcon;
