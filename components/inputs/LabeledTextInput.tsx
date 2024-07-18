import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import Colors from "@/theme/colors";

interface LabeledTextInputProps extends TextInputProps {
  label: string;
  errorMessage?: string;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  errorMessage,
  style,
  containerStyle,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !!errorMessage && styles.inputError, style]}
        placeholder={placeholder}
        placeholderTextColor={Colors.CarbonBlack70}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.CarbonBlack,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.White,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  inputError: {
    borderColor: Colors.CrimsonRed,
  },
  errorText: {
    color: Colors.CrimsonRed,
    fontSize: 12,
    marginVertical: 8,
  },
});

export default LabeledTextInput;
