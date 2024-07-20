import React, { useState, useEffect, useCallback } from "react";
import { Modal, View, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
  DateTimePickerAndroid,
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
  console.log("DateTimePickerBottomSheet mode", mode);

  const handleAndroidChange = useCallback(
    async (event: DateTimePickerEvent, selectedDate?: Date) => {
      console.log("DateTimePickerBottomSheet handleChange event", event);
      console.log(
        "DateTimePickerBottomSheet handleChange selectedDate",
        selectedDate?.toDateString()
      );
      console.log(
        "DateTimePickerBottomSheet handleChange value",
        value?.toDateString()
      );

      if (event.type === "set") {
        onChange(event, selectedDate);
        // onClose();
      }
      // if (event.type === "dismissed") onClose();
      onClose();
    },
    [onChange, onClose]
  );

  useEffect(() => {
    const handleAndroidPicker = async () => {
      // if (Platform.OS === "android") {
      //   if (visible) {
      //     DateTimePickerAndroid.open({
      //       value,
      //       mode,
      //       display: "spinner",
      //       onChange: handleAndroidChange,
      //     });
      //   }
      //   //  else {
      //   //   console.log("DateTimePickerBottomSheet handleAndroidPicker dismiss");

      //   //   await DateTimePickerAndroid.dismiss(mode);
      //   // }
      // }

      console.log(
        "DateTimePickerBottomSheet handleAndroidPicker visible",
        visible
      );

      if (!visible) {
        const dismissed = await DateTimePickerAndroid.dismiss(mode);
        console.log("DateTimePickerBottomSheet dismissed", dismissed);

        // if (dismissed) {
        //   onClose();
        // }
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

  // const handleAndroidChange = (
  //   event: DateTimePickerEvent,
  //   selectedDate?: Date
  // ) => {
  //   // const date = selectedDate || value;
  //   // if (event.type === "set") {
  //   //   onChange(event, date);
  //   // }
  //   // onClose();

  //   console.log("DateTimePickerBottomSheet handleChange event", event);
  //   console.log(
  //     "DateTimePickerBottomSheet handleChange selectedDate",
  //     selectedDate?.toDateString()
  //   );
  //   console.log(
  //     "DateTimePickerBottomSheet handleChange value",
  //     value?.toDateString()
  //   );

  //   if (event.type === "set") onChange(event, selectedDate);
  //   if (event.type === "dismissed") onClose();
  // };

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const date = selectedDate || value;
    setCurrentDate(date);

    // if (Platform.OS === "android") {
    //   console.log("DateTimePickerBottomSheet handleChange event", event);
    //   console.log(
    //     "DateTimePickerBottomSheet handleChange selectedDate",
    //     selectedDate?.toDateString()
    //   );
    //   console.log(
    //     "DateTimePickerBottomSheet handleChange value",
    //     value?.toDateString()
    //   );

    //   if (event.type === "set") onChange(event, date);
    //   onClose();

    //   return;
    // }
  };

  const handleDonePress = () => {
    console.log(
      "DateTimePickerBottomSheet handleDonePress currentDate",
      currentDate?.toDateString()
    );

    const event: DateTimePickerEvent = { type: "set" } as DateTimePickerEvent;

    onChange(event, currentDate);
    onClose();
  };

  // if (Platform.OS === "android") {
  //   console.log(
  //     "DateTimePickerBottomSheet android currentDate",
  //     value?.toDateString()
  //   );

  //   console.log("DateTimePickerBottomSheet android visible", visible);

  //   // if (!visible) {
  //   //   DateTimePickerAndroid.dismiss(mode);
  //   //   return;
  //   //   // return null;
  //   // }
  //   // return null;

  //   // DateTimePickerAndroid.open({
  //   //   value,
  //   //   mode,
  //   //   display: "spinner",
  //   //   onChange: (event, selectedDate) => {
  //   //     console.log("DateTimePickerBottomSheet handleChange event", event);
  //   //     console.log(
  //   //       "DateTimePickerBottomSheet handleChange selectedDate",
  //   //       selectedDate?.toDateString()
  //   //     );
  //   //     console.log(
  //   //       "DateTimePickerBottomSheet handleChange value",
  //   //       value?.toDateString()
  //   //     );

  //   //     if (event.type === "set") {
  //   //       // DateTimePickerAndroid.dismiss(mode);

  //   //       onChange(event, selectedDate);
  //   //     }

  //   //     onClose();
  //   //   },
  //   // });

  //   // return null;

  //   // if (!visible) return null;
  //   return (
  //     <DateTimePicker
  //       value={value}
  //       mode={mode}
  //       display="spinner"
  //       onChange={handleAndroidChange}
  //     />
  //   );
  // }

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
