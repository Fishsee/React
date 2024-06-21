import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Feed = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={22} height={22} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M6,19a1,1,0,0,1-2,0A1,1,0,0,1,6,19ZM23.73,7.625A2.482,2.482,0,0,1,21.5,9H16.981c-.02,1.061-.063,2.071-.149,3H17.2a2.746,2.746,0,0,1,2.765,3.188A3.288,3.288,0,0,1,16.729,18H15.4C13.6,21.889,8,24,3.987,24A4,4,0,0,1,.009,19.743,16.833,16.833,0,0,1,2,12.133V11.6A7.708,7.708,0,0,1,8.317,4.046a3.115,3.115,0,0,1,2.537.693A3.213,3.213,0,0,1,12,7.168c.93-.086,1.941-.129,3-.149V2.5a2.5,2.5,0,0,1,4-2,4.861,4.861,0,0,1,1.833,2.663A4.861,4.861,0,0,1,23.5,5,2.5,2.5,0,0,1,23.73,7.625ZM4.385,9.541A13.235,13.235,0,0,1,10,7.432V7.2a1.218,1.218,0,0,0-.435-.933,1.085,1.085,0,0,0-.9-.253A5.615,5.615,0,0,0,4.385,9.541ZM8.783,21.2A8.037,8.037,0,0,0,2.8,15.222,20.059,20.059,0,0,0,2,19.88,2,2,0,0,0,4.12,22,20.03,20.03,0,0,0,8.783,21.2ZM14.992,9.008c-6.239.107-9.639,1.264-11.4,4.362a10.045,10.045,0,0,1,7.04,7.039C13.728,18.646,14.885,15.247,14.992,9.008ZM16.568,14a18.72,18.72,0,0,1-.445,2h.606a1.281,1.281,0,0,0,1.261-1.094A.754.754,0,0,0,17.2,14ZM21.9,6.189a2.99,2.99,0,0,0-2.06-1.2,1,1,0,0,1-.821-.821,2.988,2.988,0,0,0-1.2-2.06.5.5,0,0,0-.537-.049A.477.477,0,0,0,17,2.5V7h4.5a.477.477,0,0,0,.445-.273A.5.5,0,0,0,21.9,6.189Z"
    />
  </Svg>
);
