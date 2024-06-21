import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

import colors from '../colors';

export const Wifi = ({ color = colors.neutral[500], ...props }: SvgProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m22.083,6.564L15.083,1.08c-1.815-1.422-4.352-1.422-6.167,0L1.917,6.564c-1.218.953-1.917,2.388-1.917,3.936v8.5c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5v-8.5c0-1.548-.699-2.982-1.917-3.936Zm-10.083,12.436c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Zm3.536-4.121c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-1.17-1.17-3.073-1.17-4.243,0-.391.391-1.023.391-1.414,0s-.391-1.023,0-1.414c1.949-1.949,5.122-1.949,7.071,0,.391.391.391,1.023,0,1.414Zm2.828-2.829c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-2.729-2.729-7.17-2.729-9.899,0-.391.391-1.023.391-1.414,0s-.391-1.023,0-1.414c3.509-3.51,9.219-3.51,12.728,0,.391.391.391,1.023,0,1.414Z"
    />
  </Svg>
);
