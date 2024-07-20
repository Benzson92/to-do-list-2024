import React from "react";
import Svg, {
  G,
  Rect,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

import Colors from "@/theme/colors";

interface RouteHeaderBackgroundProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const RouteHeaderBackground: React.FC<RouteHeaderBackgroundProps> = ({
  width = 390,
  height = 96,
  backgroundColor = Colors.PrimaryPurple,
  ...props
}) => {
  const circle1CX = width * (-20 / 390);
  const circle1CY = height * (123 / 96);
  const circle1R = height * (149 / 96);

  const circle2CX = width * (399.5 / 390);
  const circle2CY = height * (45.5 / 96);
  const circle2R = height * (55 / 96);

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      {...props}
    >
      <Rect width={width} height={height} fill={backgroundColor} />
      <G style={{ mixBlendMode: "lighten" }} opacity="0.7">
        <Circle
          cx={circle1CX}
          cy={circle1CY}
          r={circle1R}
          stroke="url(#paint0_linear_11_2800)"
          strokeOpacity="0.17"
          strokeWidth={width * (44 / 390)}
        />
      </G>
      <G style={{ mixBlendMode: "lighten" }} opacity="0.7">
        <Circle
          cx={circle2CX}
          cy={circle2CY}
          r={circle2R}
          stroke="url(#paint1_linear_11_2800)"
          strokeOpacity="0.17"
          strokeWidth={width * (35 / 390)}
        />
      </G>

      <Defs>
        <LinearGradient
          id="paint0_linear_11_2800"
          x1="-20"
          y1="-48"
          x2="-26"
          y2="154"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.0001" stopColor="white" stopOpacity="0.97" />
          <Stop offset="0.0002" stopColor="white" stopOpacity="0.77" />
          <Stop offset="1" stopColor="white" stopOpacity="0" />
          <Stop offset="1" stopColor="white" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_11_2800"
          x1="399.5"
          y1="-27"
          x2="399.5"
          y2="118"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="white" />
          <Stop offset="1" stopColor="white" stopOpacity="0" />
          <Stop offset="1" stopColor="white" stopOpacity="0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default RouteHeaderBackground;
