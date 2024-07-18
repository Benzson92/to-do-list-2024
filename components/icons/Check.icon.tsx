import React, { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

import Colors from "@/theme/colors";

interface CheckIconProps extends SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

const CheckIcon: FC<CheckIconProps> = ({
  width = 24,
  height = 24,
  fill = Colors.White,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M9.99999 15.172L19.192 5.979L20.607 7.393L9.99999 18L3.63599 11.636L5.04999 10.222L9.99999 15.172Z"
        fill={fill}
      />
    </Svg>
  );
};

export default CheckIcon;
