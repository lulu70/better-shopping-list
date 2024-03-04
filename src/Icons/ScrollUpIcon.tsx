import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import theme from '../constants/theme';
import { horizontalScale } from '../helpers/scaleHelpers';
const ScrollUpIcon = (props: SvgProps) => (
  <Svg
    width={horizontalScale(theme.spacing.spacing_48)}
    height={horizontalScale(theme.spacing.spacing_48)}
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z" />
  </Svg>
);
export default ScrollUpIcon;
