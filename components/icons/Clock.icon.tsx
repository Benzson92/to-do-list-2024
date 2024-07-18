import React, { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

import Colors from "@/theme/colors";

interface ClockIconProps extends SvgProps {
  width?: number;
  height?: number;
  stroke?: string;
}

const ClockIcon: FC<ClockIconProps> = ({
  width = 20,
  height = 20,
  stroke = Colors.PrimaryPurple,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 9.99999C18.3334 5.39762 14.6024 1.66666 10 1.66666C5.39765 1.66666 1.66669 5.39762 1.66669 9.99999C1.66669 14.6024 5.39765 18.3333 10 18.3333Z"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 5V10L13.3333 11.6667"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ClockIcon;
