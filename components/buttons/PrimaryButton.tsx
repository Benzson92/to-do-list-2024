// app/components/buttons/PrimaryButton.tsx

import React, { forwardRef } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import Colors from "@/theme/colors"; // Import colors

// Define the props for the component, extending PressableProps
interface PrimaryButtonProps extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

// Define the PrimaryButton component
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

// Define the styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PrimaryPurple,
    height: 56, // Fixed height
    justifyContent: "center", // Center the text vertically
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

// Export the component
export default PrimaryButton;
