import React, { FC } from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

import Colors from "@/theme/colors";

interface TrophyIconProps extends SvgProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  iconColor?: string;
}

const TrophyIcon: FC<TrophyIconProps> = ({
  width = 48,
  height = 48,
  backgroundColor = Colors.CreamYellow,
  borderRadius = 24,
  iconColor = Colors.DarkBrown,
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
        d="M25 28.938V31H30V33H18V31H23V28.938C21.0667 28.6942 19.2888 27.7533 18 26.2917C16.7112 24.8302 16 22.9486 16 21V15H32V21C32 22.9486 31.2888 24.8302 30 26.2917C28.7112 27.7533 26.9333 28.6942 25 28.938ZM18 17V21C18 22.5913 18.6321 24.1174 19.7574 25.2426C20.8826 26.3679 22.4087 27 24 27C25.5913 27 27.1174 26.3679 28.2426 25.2426C29.3679 24.1174 30 22.5913 30 21V17H18ZM13 17H15V21H13V17ZM33 17H35V21H33V17Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default TrophyIcon;
