import React, { FC } from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

import Colors from "@/theme/colors";

interface CalendarEventIconProps extends SvgProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  iconColor?: string;
}

const CalendarEventIcon: FC<CalendarEventIconProps> = ({
  width = 48,
  height = 48,
  backgroundColor = Colors.LilacMist,
  borderRadius = 24,
  iconColor = Colors.PrimaryPurple,
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
        d="M29 15H33C33.2652 15 33.5196 15.1054 33.7071 15.2929C33.8946 15.4804 34 15.7348 34 16V32C34 32.2652 33.8946 32.5196 33.7071 32.7071C33.5196 32.8946 33.2652 33 33 33H15C14.7348 33 14.4804 32.8946 14.2929 32.7071C14.1054 32.5196 14 32.2652 14 32V16C14 15.7348 14.1054 15.4804 14.2929 15.2929C14.4804 15.1054 14.7348 15 15 15H19V13H21V15H27V13H29V15ZM16 21V31H32V21H16ZM18 25H23V29H18V25Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default CalendarEventIcon;
