// React and React Native imports
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import isEmpty from "lodash/isEmpty";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { formatDate, formatTime } from "../utils/dateTime.util";

// Icon imports
import CalendarEventIcon from "./icons/CalendarEvent.icon";
import DocumentIcon from "./icons/Document.icon";
import TrophyIcon from "./icons/Trophy.icon";
import CalendarIcon from "./icons/Calendar.icon";
import CloseIcon from "./icons/Close.icon";
import ClockIcon from "./icons/Clock.icon";

// Theme imports
import Colors from "@/theme/colors";
import { capitalizeText } from "../utils/capitalizeText.util"; // Utility Function

// Component imports
import LabeledTextInput from "./inputs/LabeledTextInput";
import DateTimeInput from "./inputs/DateTimeInput";

import RouteHeader from "./headers/RouteHeader";
import CategorySelection from "./CategorySelection";
import PrimaryButton from "./buttons/PrimaryButton";
import DateTimePickerBottomSheet from "./modals/DateTimePickerBottomSheet";

// Types and DTOs
import {
  FormValues,
  FormErrors,
  TodoTaskFormProps,
} from "../models/todo/todo.interface";
import { TodoCategoryType } from "@/types/todo/todo.type";
import { REQUIRED_FIELDS } from "../constants/form.constant"; // Form Constants

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
  onClose,
}) => {
  const [pickerState, setPickerState] = useState<{
    visible: boolean;
    mode: "date" | "time";
  }>({ visible: false, mode: "date" });

  const { width: screenWidth } = useWindowDimensions();
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
    // const errors: FormErrors = {};

    // if (!formValues.title) {
    //   errors.title = "Title is required";
    // }
    // if (!formValues.category) {
    //   errors.category = "Category is required";
    // }

    // if (!formValues.date) {
    //   errors.date = "Date is required";
    // }

    // if (!formValues.time) {
    //   errors.time = "Time is required";
    // }

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
    <View
      style={{ flex: 1, backgroundColor: Colors.FrostedSilver }}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}> */}
      <RouteHeader onClose={onClose} title="Add New Task" />
      {/* <View style={styles.headerBackgroundContainer}>
          <RouteHeaderBackground width={screenWidth} />
          <View style={styles.headerContent}>
            <Pressable onPress={onClose}>
              <CloseIcon />
            </Pressable>
            <Text style={styles.headerText}>Add New Task</Text>
          </View>
        </View> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 24 }}
          extraHeight={180}
          // extraScrollHeight={50}
        >
          <View style={styles.container}>
            {/* <View style={styles.headerBackgroundContainer}>
                <RouteHeaderBackground width={screenWidth} />
                <View style={styles.headerContent}>
                  <Pressable onPress={onClose}>
                    <CloseIcon />
                  </Pressable>
                  <Text style={styles.headerText}>Add New Task</Text>
                </View>
              </View> */}

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

            {/* <Text style={styles.categoryLabel}>Category</Text>
              <View style={styles.categoryContainer}>
                {categoryOptions.map((option) => (
                  <Pressable
                    key={option.type}
                    onPress={() => handleInputChange("category", option.type)}
                  >
                    <View
                      style={[
                        styles.iconWrapper,
                        formValues.category === option.type &&
                          styles.selectedIconWrapper,
                      ]}
                    >
                      <option.icon />
                    </View>
                  </Pressable>
                ))}
              </View>
              {formErrors.category && (
                <Text style={styles.errorText}>{formErrors.category}</Text>
              )} */}

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

            {/* <Pressable
                onPress={() => handlePickerOpen("date")}
                style={styles.dateTimeInput}
              >
                <Text>
                  {formValues.date ? formValues.date.toDateString() : "Date"}
                </Text>
                <CalendarIcon />
              </Pressable>
              {formErrors.date && (
                <Text style={styles.errorText}>{formErrors.date}</Text>
              )} */}

            {/* <Pressable
                onPress={() => handlePickerOpen("time")}
                style={styles.dateTimeInput}
              >
                <Text>
                  {formValues.time
                    ? formValues.time.toLocaleTimeString()
                    : "Time"}
                </Text>
                <ClockIcon />
              </Pressable>
              {formErrors.time && (
                <Text style={styles.errorText}>{formErrors.time}</Text>
              )} */}

            <LabeledTextInput
              label="Notes"
              value={formValues.notes}
              placeholder="Notes"
              onChangeText={(text) => handleInputChange("notes", text)}
              multiline
              textAlignVertical="top"
              style={styles.notesInput}
            />

            {/* <PrimaryButton
                title="Save"
                onPress={handleSave}
                style={styles.saveButton}
              /> */}
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
        onChange={(event, selectedDate) => {
          handleInputChange(pickerState.mode, selectedDate || new Date());
          handlePickerClose();
        }}
        value={formValues[pickerState.mode] || new Date()}
      />
      {/* </SafeAreaView> */}
    </View>
  );
};

export default TodoTaskForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.FrostedSilver,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerBackgroundContainer: {
    position: "relative",
    height: 96,
    marginBottom: 16,
  },
  headerContent: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.White,
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 8,
  },
  categoryLabel: {
    fontSize: 14,
    color: Colors.Charcoal,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 50,
  },
  selectedIconWrapper: {
    backgroundColor: Colors.LilacMist,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dateTimeInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.White,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  notesInput: {
    height: 180,
    // marginHorizontal: 16,
  },
  saveButton: {
    backgroundColor: Colors.PrimaryPurple,
    padding: 16,
    // borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  saveButtonText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: Colors.CrimsonRed,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
});
