import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

import colors from '../colors';

export const Checkmark = ({
  color = colors.neutral[500],
  ...props
}: SvgProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-.091,15.419c-.387.387-.896.58-1.407.58s-1.025-.195-1.416-.585l-2.782-2.696,1.393-1.437,2.793,2.707,5.809-5.701,1.404,1.425-5.793,5.707Z"
    />
  </Svg>
);
