import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import theme from '../constants/theme';
import { horizontalScale } from '../helpers/scaleHelpers';

interface Props extends SvgProps {
  size?: number;
}
const SearchIcon = ({
  stroke = theme.colors.text_black,
  strokeWidth = 1.5,
  size = horizontalScale(theme.spacing.spacing_20),
  ...props
}: Props) => (
  <Svg
    fill="none"
    width={size}
    height={size}
    stroke={stroke}
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </Svg>
);

export default SearchIcon;
