import React, { FC } from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

import Colors from "@/theme/colors";

interface CloseIconProps extends SvgProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  iconColor?: string;
}

const CloseIcon: FC<CloseIconProps> = ({
  width = 48,
  height = 48,
  backgroundColor = Colors.White,
  borderRadius = 24,
  iconColor = Colors.MidnightNavy,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <Rect
        width={width}
        height={height}
        rx={borderRadius}
        fill={backgroundColor}
      />
      <Path
        d="M18 18L30.7742 30.7742M18 30.7742L30.7742 18"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloseIcon;
