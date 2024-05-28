import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg from 'react-native-svg';

import { isRTL } from '@/core';

export const Search = ({ style, ...props }: SvgProps) => (
  <Svg
    width={16}
    height={18}
    viewBox="0 0 7 14"
    fill="none"
    {...props}
    style={StyleSheet.flatten([
      style,
      { transform: [{ scaleX: isRTL ? 1 : -1 }] },
    ])}
  >
    <circle
      fill="none"
      stroke-opacity="1"
      stroke="#FF156D"
      stroke-width=".5"
      cx="100"
      cy="100"
      r="0"
    >
      <animate
        attributeName="r"
        calcMode="spline"
        dur="2"
        values="1;80"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-width"
        calcMode="spline"
        dur="2"
        values="0;25"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-opacity"
        calcMode="spline"
        dur="2"
        values="1;0"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      />
    </circle>
  </Svg>
);
