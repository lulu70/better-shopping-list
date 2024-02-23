import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import theme from '../constants/theme';
import { horizontalScale } from '../helpers/scaleHelpers';

const CloseIcon = (props: SvgProps) => (
  <Svg
    width={horizontalScale(theme.spacing.spacing_24)}
    height={horizontalScale(theme.spacing.spacing_24)}
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M256-227.692 227.692-256l224-224-224-224L256-732.308l224 224 224-224L732.308-704l-224 224 224 224L704-227.692l-224-224-224 224Z" />
  </Svg>
);

export default CloseIcon;
