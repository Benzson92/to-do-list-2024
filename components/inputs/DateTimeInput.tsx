import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import Colors from "@/theme/colors";

interface DateTimeInputProps {
  label: string;
  value?: string;
  icon: React.FC;
  onPress: () => void;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  value,
  icon: Icon,
  onPress,
  errorMessage,
  style,
}) => {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={onPress} style={styles.dateTimeInputContainer}>
        <Text
          style={[
            styles.dateTimeInput,
            value ? styles.valueText : styles.placeholderText,
          ]}
        >
          {value || label}
        </Text>
        <Icon />
      </Pressable>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default DateTimeInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.CarbonBlack,
    marginBottom: 8,
  },
  dateTimeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  dateTimeInput: {
    fontSize: 16,
  },
  valueText: {
    color: Colors.CarbonBlack,
  },
  placeholderText: {
    color: Colors.CarbonBlack70,
  },
  errorText: {
    color: Colors.CrimsonRed,
    fontSize: 12,
    marginTop: 8,
  },
});
