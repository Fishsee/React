import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

import colors from '../colors';

export const Potential = ({
  color = colors.neutral[500],
  ...props
}: SvgProps) => (
  <Svg width={19} height={20} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m23 11a1 1 0 0 0 -1 1 10.034 10.034 0 1 1 -2.9-7.021.862.862 0 0 1 -.1.021h-3a1 1 0 0 0 0 2h3a3 3 0 0 0 3-3v-3a1 1 0 0 0 -2 0v2.065a11.994 11.994 0 1 0 4 8.935 1 1 0 0 0 -1-1z"
    />
    <Path
      fill={color}
      d="m12 6a1 1 0 0 0 -1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414l-2.707-2.707v-4.586a1 1 0 0 0 -1-1z"
    />
  </Svg>
);
