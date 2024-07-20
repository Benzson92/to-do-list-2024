import React, { forwardRef } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import Colors from "@/theme/colors";

interface PrimaryButtonProps extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const PrimaryButton = forwardRef<
  React.ElementRef<typeof Pressable>,
  PrimaryButtonProps
>(({ title, style, disabled, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed || disabled ? 0.5 : 1 },
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PrimaryPurple,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  text: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrimaryButton;
