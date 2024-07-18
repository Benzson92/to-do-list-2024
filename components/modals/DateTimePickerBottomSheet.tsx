import React, { useState } from "react";
import { Modal, View, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Local Imports
import Colors from "@/theme/colors";
import PrimaryButton from "../buttons/PrimaryButton";

// Define Props Interface
interface DateTimePickerBottomSheetProps {
  visible: boolean;
  mode: "date" | "time";
  onClose: () => void;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  value: Date;
}

// DateTimePickerBottomSheet Component
const DateTimePickerBottomSheet: React.FC<DateTimePickerBottomSheetProps> = ({
  visible,
  mode,
  onClose,
  onChange,
  value,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(value);
  const insets = useSafeAreaInsets();

  console.log("DateTimePickerBottomSheet visible", visible);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const date = selectedDate || value;
    setCurrentDate(date);

    if (Platform.OS === "android") {
      console.log("DateTimePickerBottomSheet handleChange event", event);
      console.log(
        "DateTimePickerBottomSheet handleChange selectedDate",
        selectedDate?.toDateString()
      );
      console.log(
        "DateTimePickerBottomSheet handleChange value",
        value?.toDateString()
      );

      onChange(event, date);
      onClose();

      return;
    }
  };

  const handleDonePress = () => {
    const event: DateTimePickerEvent = { type: "set" } as DateTimePickerEvent;
    onChange(event, currentDate);
    onClose();
  };

  if (Platform.OS === "android" && visible) {
    return (
      <DateTimePicker
        value={currentDate}
        mode={mode}
        display="spinner"
        onChange={handleChange}
      />
    );
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.container, { paddingBottom: 16 + insets.bottom }]}>
          <DateTimePicker
            value={currentDate}
            mode={mode}
            display="spinner"
            onChange={handleChange}
          />
          <PrimaryButton title="Done" onPress={handleDonePress} />
        </View>
      </Pressable>
    </Modal>
  );
};

// Define Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    backgroundColor: Colors.White,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default DateTimePickerBottomSheet;
