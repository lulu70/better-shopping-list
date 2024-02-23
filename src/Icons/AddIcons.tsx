import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import theme from '../constants/theme';
import { horizontalScale } from '../helpers/scaleHelpers';

const AddIcon = (props: SvgProps) => (
  <Svg
    width={horizontalScale(theme.spacing.spacing_32)}
    height={horizontalScale(theme.spacing.spacing_32)}
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M417-417H166v-126h251v-251h126v251h251v126H543v251H417v-251Z" />
  </Svg>
);
export default AddIcon;
