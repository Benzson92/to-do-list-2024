import React, { useState, useEffect, useCallback } from "react";
import { Modal, View, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/theme/colors";
import PrimaryButton from "../buttons/PrimaryButton";

interface DateTimePickerBottomSheetProps {
  visible: boolean;
  mode: "date" | "time";
  onClose: () => void;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  value: Date;
}

const DateTimePickerBottomSheet: React.FC<DateTimePickerBottomSheetProps> = ({
  visible,
  mode,
  onClose,
  onChange,
  value,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(value);
  const insets = useSafeAreaInsets();

  const handleAndroidChange = useCallback(
    async (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (event.type === "set") {
        onChange(event, selectedDate);
      }

      onClose();
    },
    [onChange, onClose]
  );

  useEffect(() => {
    const handleAndroidPicker = async () => {
      if (!visible) {
        await DateTimePickerAndroid.dismiss(mode);
      } else
        DateTimePickerAndroid.open({
          value,
          mode,
          display: "spinner",
          onChange: handleAndroidChange,
        });
    };

    if (Platform.OS === "android") handleAndroidPicker();
  }, [visible, mode, value, handleAndroidChange]);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const date = selectedDate || value;
    setCurrentDate(date);
  };

  const handleDonePress = () => {
    const event: DateTimePickerEvent = { type: "set" } as DateTimePickerEvent;

    onChange(event, currentDate);
    onClose();
  };

  if (Platform.OS === "android") return null;

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
