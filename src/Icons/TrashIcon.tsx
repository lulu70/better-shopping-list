import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import theme from '../constants/theme';
import { horizontalScale } from '../helpers/scaleHelpers';

const TrashIcon = (props: SvgProps) => (
  <Svg
    testID="TrashIcon"
    width={horizontalScale(theme.spacing.spacing_26)}
    height={horizontalScale(theme.spacing.spacing_26)}
    viewBox="0 -960 960 960"
    fill={theme.colors.error}
    {...props}
  >
    <Path d="M304.615-160q-26.846 0-45.731-18.884Q240-197.769 240-224.615V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.385Q720-197 701.5-178.5 683-160 655.385-160h-350.77ZM680-720H280v495.385q0 10.769 6.923 17.692T304.615-200h350.77q9.23 0 16.923-7.692Q680-215.385 680-224.615V-720ZM392.307-280h40.001v-360h-40.001v360Zm135.385 0h40.001v-360h-40.001v360ZM280-720v520-520Z" />
  </Svg>
);

export default TrashIcon;
