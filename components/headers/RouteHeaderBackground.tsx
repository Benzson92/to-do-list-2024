// RouteHeaderBackground.tsx

// React and React Native imports
import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, {
  G,
  Rect,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

// Theme and constants imports
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
  const circle1CX = width * (-20 / 390); // Original cx value divided by default width
  const circle1CY = height * (123 / 96); // Original cy value divided by default height
  const circle1R = height * (149 / 96); // Original radius value divided by default height

  const circle2CX = width * (399.5 / 390); // Original cx value divided by default width
  const circle2CY = height * (45.5 / 96); // Original cy value divided by default height
  const circle2R = height * (55 / 96); // Original radius value divided by default height

  return (
    // <View style={[styles.container, { width, height }]}>
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      {...props}
    >
      {/* <G clipPath="url(#clip0_11_2800)"> */}
      <Rect width={width} height={height} fill={backgroundColor} />
      <G style={{ mixBlendMode: "lighten" }} opacity="0.7">
        <Circle
          cx={circle1CX}
          cy={circle1CY}
          r={circle1R}
          stroke="url(#paint0_linear_11_2800)"
          strokeOpacity="0.17"
          strokeWidth={width * (44 / 390)} // Scale stroke width proportionally
        />
      </G>
      <G style={{ mixBlendMode: "lighten" }} opacity="0.7">
        <Circle
          cx={circle2CX}
          cy={circle2CY}
          r={circle2R}
          stroke="url(#paint1_linear_11_2800)"
          strokeOpacity="0.17"
          strokeWidth={width * (35 / 390)} // Scale stroke width proportionally
        />
      </G>
      {/* <Path
          d="M142.869 51H140.619L144.715 39.3636H147.317L151.42 51H149.17L146.062 41.75H145.971L142.869 51ZM142.942 46.4375H149.079V48.1307H142.942V46.4375ZM155.835 51.1534C155.149 51.1534 154.535 50.9773 153.994 50.625C153.452 50.2727 153.024 49.7614 152.71 49.0909C152.395 48.4205 152.238 47.6061 152.238 46.6477C152.238 45.678 152.397 44.8598 152.715 44.1932C153.037 43.5227 153.471 43.017 154.016 42.6761C154.562 42.3314 155.17 42.1591 155.84 42.1591C156.352 42.1591 156.772 42.2462 157.102 42.4205C157.431 42.5909 157.692 42.7973 157.886 43.0398C158.079 43.2784 158.228 43.5038 158.335 43.7159H158.42V39.3636H160.482V51H158.46V49.625H158.335C158.228 49.8371 158.075 50.0625 157.874 50.3011C157.674 50.536 157.408 50.7367 157.079 50.9034C156.749 51.0701 156.335 51.1534 155.835 51.1534ZM156.408 49.4659C156.844 49.4659 157.215 49.3485 157.522 49.1136C157.829 48.875 158.062 48.5436 158.221 48.1193C158.38 47.6951 158.46 47.2008 158.46 46.6364C158.46 46.072 158.38 45.5814 158.221 45.1648C158.066 44.7481 157.835 44.4242 157.528 44.1932C157.225 43.9621 156.852 43.8466 156.408 43.8466C155.95 43.8466 155.567 43.9659 155.261 44.2045C154.954 44.4432 154.723 44.7727 154.567 45.1932C154.412 45.6136 154.335 46.0947 154.335 46.6364C154.335 47.1818 154.412 47.6686 154.567 48.0966C154.727 48.5208 154.96 48.8561 155.266 49.1023C155.577 49.3447 155.958 49.4659 156.408 49.4659ZM165.913 51.1534C165.227 51.1534 164.613 50.9773 164.072 50.625C163.53 50.2727 163.102 49.7614 162.788 49.0909C162.473 48.4205 162.316 47.6061 162.316 46.6477C162.316 45.678 162.475 44.8598 162.793 44.1932C163.115 43.5227 163.549 43.017 164.094 42.6761C164.64 42.3314 165.248 42.1591 165.918 42.1591C166.43 42.1591 166.85 42.2462 167.18 42.4205C167.509 42.5909 167.771 42.7973 167.964 43.0398C168.157 43.2784 168.307 43.5038 168.413 43.7159H168.498V39.3636H170.56V51H168.538V49.625H168.413C168.307 49.8371 168.153 50.0625 167.952 50.3011C167.752 50.536 167.487 50.7367 167.157 50.9034C166.827 51.0701 166.413 51.1534 165.913 51.1534ZM166.487 49.4659C166.922 49.4659 167.293 49.3485 167.6 49.1136C167.907 48.875 168.14 48.5436 168.299 48.1193C168.458 47.6951 168.538 47.2008 168.538 46.6364C168.538 46.072 168.458 45.5814 168.299 45.1648C168.144 44.7481 167.913 44.4242 167.606 44.1932C167.303 43.9621 166.93 43.8466 166.487 43.8466C166.028 43.8466 165.646 43.9659 165.339 44.2045C165.032 44.4432 164.801 44.7727 164.646 45.1932C164.49 45.6136 164.413 46.0947 164.413 46.6364C164.413 47.1818 164.49 47.6686 164.646 48.0966C164.805 48.5208 165.038 48.8561 165.344 49.1023C165.655 49.3447 166.036 49.4659 166.487 49.4659ZM186.374 39.3636V51H184.499L179.016 43.0739H178.92V51H176.812V39.3636H178.698L184.175 47.2955H184.278V39.3636H186.374ZM192.444 51.1705C191.569 51.1705 190.813 50.9886 190.177 50.625C189.544 50.2576 189.058 49.7386 188.717 49.0682C188.376 48.3939 188.205 47.6004 188.205 46.6875C188.205 45.7898 188.376 45.0019 188.717 44.3239C189.061 43.642 189.542 43.1117 190.16 42.733C190.777 42.3504 191.503 42.1591 192.336 42.1591C192.874 42.1591 193.381 42.2462 193.859 42.4205C194.34 42.5909 194.764 42.8561 195.131 43.2159C195.503 43.5758 195.794 44.0341 196.006 44.5909C196.219 45.1439 196.325 45.803 196.325 46.5682V47.1989H189.171V45.8125H194.353C194.349 45.4186 194.264 45.0682 194.097 44.7614C193.931 44.4508 193.698 44.2064 193.398 44.0284C193.103 43.8504 192.758 43.7614 192.364 43.7614C191.944 43.7614 191.575 43.8636 191.256 44.0682C190.938 44.2689 190.69 44.5341 190.512 44.8636C190.338 45.1894 190.249 45.5473 190.245 45.9375V47.1477C190.245 47.6553 190.338 48.0909 190.523 48.4545C190.709 48.8144 190.969 49.0909 191.302 49.2841C191.635 49.4735 192.025 49.5682 192.472 49.5682C192.772 49.5682 193.042 49.5265 193.285 49.4432C193.527 49.3561 193.737 49.2292 193.915 49.0625C194.094 48.8958 194.228 48.6894 194.319 48.4432L196.239 48.6591C196.118 49.1667 195.887 49.6098 195.546 49.9886C195.209 50.3636 194.777 50.6553 194.251 50.8636C193.724 51.0682 193.122 51.1705 192.444 51.1705ZM199.819 51L197.353 42.2727H199.45L200.984 48.4091H201.063L202.631 42.2727H204.705L206.273 48.375H206.359L207.87 42.2727H209.972L207.501 51H205.359L203.722 45.1023H203.603L201.967 51H199.819ZM214.957 41.1307V39.3636H224.241V41.1307H220.644V51H218.553V41.1307H214.957ZM227.263 51.1761C226.71 51.1761 226.212 51.0777 225.769 50.8807C225.33 50.6799 224.981 50.3845 224.724 49.9943C224.47 49.6042 224.343 49.1231 224.343 48.5511C224.343 48.0587 224.434 47.6515 224.616 47.3295C224.798 47.0076 225.046 46.75 225.36 46.5568C225.674 46.3636 226.029 46.2178 226.423 46.1193C226.82 46.017 227.231 45.9432 227.656 45.8977C228.167 45.8447 228.582 45.7973 228.9 45.7557C229.218 45.7102 229.449 45.642 229.593 45.5511C229.741 45.4564 229.815 45.3106 229.815 45.1136V45.0795C229.815 44.6515 229.688 44.3201 229.434 44.0852C229.18 43.8504 228.815 43.733 228.337 43.733C227.834 43.733 227.434 43.8428 227.138 44.0625C226.847 44.2822 226.65 44.5417 226.548 44.8409L224.627 44.5682C224.779 44.0379 225.029 43.5947 225.377 43.2386C225.726 42.8788 226.152 42.6098 226.656 42.4318C227.159 42.25 227.716 42.1591 228.326 42.1591C228.746 42.1591 229.165 42.2083 229.582 42.3068C229.998 42.4053 230.379 42.5682 230.724 42.7955C231.068 43.0189 231.345 43.3239 231.553 43.7102C231.765 44.0966 231.871 44.5795 231.871 45.1591V51H229.894V49.8011H229.826C229.701 50.0436 229.525 50.2708 229.298 50.483C229.074 50.6913 228.792 50.8598 228.451 50.9886C228.114 51.1136 227.718 51.1761 227.263 51.1761ZM227.798 49.6648C228.21 49.6648 228.568 49.5833 228.871 49.4205C229.174 49.2538 229.407 49.0341 229.57 48.7614C229.737 48.4886 229.82 48.1913 229.82 47.8693V46.8409C229.756 46.8939 229.646 46.9432 229.491 46.9886C229.339 47.0341 229.169 47.0739 228.979 47.108C228.79 47.142 228.603 47.1723 228.417 47.1989C228.231 47.2254 228.07 47.2481 227.934 47.267C227.627 47.3087 227.353 47.3769 227.11 47.4716C226.868 47.5663 226.676 47.6989 226.536 47.8693C226.396 48.036 226.326 48.2519 226.326 48.517C226.326 48.8958 226.464 49.1818 226.741 49.375C227.017 49.5682 227.37 49.6648 227.798 49.6648ZM240.837 44.5795L238.962 44.7841C238.909 44.5947 238.817 44.4167 238.684 44.25C238.555 44.0833 238.381 43.9489 238.161 43.8466C237.942 43.7443 237.673 43.6932 237.354 43.6932C236.926 43.6932 236.567 43.786 236.275 43.9716C235.987 44.1572 235.845 44.3977 235.849 44.6932C235.845 44.947 235.938 45.1534 236.127 45.3125C236.32 45.4716 236.638 45.6023 237.082 45.7045L238.57 46.0227C239.396 46.2008 240.01 46.483 240.411 46.8693C240.817 47.2557 241.021 47.7614 241.025 48.3864C241.021 48.9356 240.86 49.4205 240.542 49.8409C240.228 50.2576 239.79 50.5833 239.229 50.8182C238.669 51.053 238.025 51.1705 237.298 51.1705C236.229 51.1705 235.37 50.947 234.718 50.5C234.067 50.0492 233.678 49.4223 233.553 48.6193L235.559 48.4261C235.65 48.8201 235.843 49.1174 236.138 49.3182C236.434 49.5189 236.818 49.6193 237.292 49.6193C237.781 49.6193 238.173 49.5189 238.468 49.3182C238.767 49.1174 238.917 48.8693 238.917 48.5739C238.917 48.3239 238.82 48.1174 238.627 47.9545C238.438 47.7917 238.142 47.6667 237.741 47.5795L236.252 47.267C235.415 47.0928 234.796 46.7992 234.394 46.3864C233.993 45.9697 233.794 45.4432 233.798 44.8068C233.794 44.2689 233.94 43.803 234.235 43.4091C234.534 43.0114 234.949 42.7045 235.479 42.4886C236.013 42.2689 236.629 42.1591 237.326 42.1591C238.349 42.1591 239.154 42.3769 239.741 42.8125C240.332 43.2481 240.697 43.8371 240.837 44.5795ZM244.596 48.2614L244.59 45.7784H244.92L248.056 42.2727H250.46L246.602 46.5682H246.175L244.596 48.2614ZM242.721 51V39.3636H244.778V51H242.721ZM248.198 51L245.357 47.0284L246.744 45.5795L250.658 51H248.198Z"
          fill="white"
        /> */}
      {/* <Rect x="16" y="24" width="48" height="48" rx="24" fill="white" /> */}
      {/* <Path
        d="M34 42L46.7742 54.7742M34 54.7742L46.7742 42"
        stroke="#14142B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      /> */}
      {/* </G> */}
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
        {/* <ClipPath id="clip0_11_2800">
          <Rect width="390" height="96" fill="white" />
        </ClipPath> */}
      </Defs>
    </Svg>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RouteHeaderBackground;
