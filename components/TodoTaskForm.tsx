import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import isEmpty from "lodash/isEmpty";

import { formatDate, formatTime } from "../utils/dateTime.util";
import { capitalizeText } from "../utils/capitalizeText.util";

import CalendarEventIcon from "./icons/CalendarEvent.icon";
import DocumentIcon from "./icons/Document.icon";
import TrophyIcon from "./icons/Trophy.icon";
import CalendarIcon from "./icons/Calendar.icon";
import ClockIcon from "./icons/Clock.icon";

import Colors from "@/theme/colors";

import LabeledTextInput from "./inputs/LabeledTextInput";
import DateTimeInput from "./inputs/DateTimeInput";
import CategorySelection from "./CategorySelection";
import PrimaryButton from "./buttons/PrimaryButton";
import DateTimePickerBottomSheet from "./modals/DateTimePickerBottomSheet";

import {
  FormValues,
  FormErrors,
  TodoTaskFormProps,
} from "../models/todo/todo.interface";
import { TodoCategoryType } from "@/types/todo/todo.type";

import { REQUIRED_FIELDS } from "../constants/form.constant";

const categoryOptions: { type: TodoCategoryType; icon: React.FC }[] = [
  { type: "General", icon: DocumentIcon },
  { type: "Scheduled", icon: CalendarEventIcon },
  { type: "Goal", icon: TrophyIcon },
];

const TodoTaskForm: React.FC<TodoTaskFormProps> = ({
  formValues,
  formErrors,
  setFormValues,
  setFormErrors,
  onSubmit,
}) => {
  const [pickerState, setPickerState] = useState<{
    visible: boolean;
    mode: "date" | "time";
  }>({ visible: false, mode: "date" });

  const insets = useSafeAreaInsets();

  const handleInputChange = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSave = () => {
    const errors = REQUIRED_FIELDS.reduce((acc, field) => {
      if (!formValues[field]) {
        acc[field] = `${capitalizeText(field)} is required`;
      }
      return acc;
    }, {} as FormErrors);

    setFormErrors(errors);

    if (isEmpty(errors)) {
      onSubmit({
        title: formValues.title,
        category: formValues.category!,
        date: formValues.date?.toISOString() || "",
        time: formValues.time?.toISOString() || "",
        notes: formValues.notes,
      });
    }
  };

  const handlePickerOpen = (mode: "date" | "time") => {
    setPickerState({
      visible: true,
      mode,
    });
  };

  const handlePickerClose = () => {
    setPickerState({
      visible: false,
      mode: pickerState.mode,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollViewContainer}
          extraHeight={180}
        >
          <View style={styles.innerContainer}>
            <LabeledTextInput
              label="Task Title"
              value={formValues.title}
              placeholder="Task Title"
              onChangeText={(text) => handleInputChange("title", text)}
              errorMessage={formErrors.title}
            />

            <CategorySelection
              options={categoryOptions}
              selectedCategory={formValues.category}
              onSelectCategory={(category) =>
                handleInputChange("category", category)
              }
              errorMessage={formErrors.category}
              style={{ marginVertical: 24 }}
            />

            <View style={styles.dateTimeContainer}>
              <DateTimeInput
                label="Date"
                value={formatDate(formValues.date?.toISOString())}
                icon={CalendarIcon}
                onPress={() => handlePickerOpen("date")}
                errorMessage={formErrors.date}
                style={{ flex: 1, marginRight: 8 }}
              />
              <DateTimeInput
                label="Time"
                value={formatTime(formValues.time?.toISOString())}
                icon={ClockIcon}
                onPress={() => handlePickerOpen("time")}
                errorMessage={formErrors.time}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>

            <LabeledTextInput
              label="Notes"
              value={formValues.notes}
              placeholder="Notes"
              onChangeText={(text) => handleInputChange("notes", text)}
              multiline
              textAlignVertical="top"
              style={styles.notesInput}
            />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <PrimaryButton
        title="Save"
        onPress={handleSave}
        style={[styles.saveButton, { marginBottom: insets.bottom + 24 }]}
      />

      <DateTimePickerBottomSheet
        visible={pickerState.visible}
        mode={pickerState.mode}
        onClose={handlePickerClose}
        onChange={(_, selectedDate) => {
          handleInputChange(pickerState.mode, selectedDate || new Date());
        }}
        value={formValues[pickerState.mode] || new Date()}
      />
    </View>
  );
};

export default TodoTaskForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.FrostedSilver,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 24,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  notesInput: {
    height: 180,
  },
  saveButton: {
    backgroundColor: Colors.PrimaryPurple,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  errorText: {
    color: Colors.CrimsonRed,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
});
