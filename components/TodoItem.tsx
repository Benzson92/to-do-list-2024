import React, { forwardRef, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { TodoCategoryType } from "@/types/todo/todo.type";
import { TodoItemDTO } from "../models/todo/todo.dto";

import { formatDateTime } from "../utils/dateTime.util";

import Colors from "@/theme/colors";

import CalendarEventIcon from "./icons/CalendarEvent.icon";
import DocumentIcon from "./icons/Document.icon";
import TrophyIcon from "./icons/Trophy.icon";
import CheckIcon from "./icons/Check.icon";

const categoryIconMap: Record<TodoCategoryType, React.FC> = {
  Scheduled: CalendarEventIcon,
  General: DocumentIcon,
  Goal: TrophyIcon,
};

const renderCategoryIcon = (category: TodoCategoryType): React.ReactNode => {
  const IconComponent = categoryIconMap[category] || DocumentIcon;
  return <IconComponent />;
};

interface TodoItemProps extends PressableProps {
  data: TodoItemDTO;
  onTodoItemPress?: (id: string) => void;
  onSwipeLeft: (id: string) => void;
  onCheckboxPress: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const TodoItem = forwardRef<Swipeable, TodoItemProps>(
  (
    {
      data,
      onTodoItemPress,
      onSwipeLeft,
      onCheckboxPress,
      containerStyle,
      ...rest
    },
    ref
  ) => {
    const { id, title, completed, date, time, category } = data;
    const swipeActionPerformedRef = useRef(false);

    const { width: screenWidth } = useWindowDimensions();
    const swipeableWidth = screenWidth - 32; // 16px padding on each side
    const halfSwipeableWidth = swipeableWidth / 2;

    const handlePress = useCallback(() => {
      setTimeout(() => {
        if (!swipeActionPerformedRef.current) onTodoItemPress?.(id);
        swipeActionPerformedRef.current = false;
      }, 500);
    }, [onTodoItemPress, id]);

    const handleCheckboxPress = useCallback(() => {
      onCheckboxPress(id);
    }, [onCheckboxPress, id]);

    const renderRightActions = () => (
      <View style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </View>
    );

    const handleSwipeableWillOpen = useCallback(() => {
      swipeActionPerformedRef.current = true;
    }, []);

    const handleSwipeableOpen = useCallback(
      (direction: "left" | "right") => {
        if (direction === "right") onSwipeLeft(id);
      },
      [onSwipeLeft, id]
    );

    return (
      <Swipeable
        ref={ref}
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={handleSwipeableWillOpen}
        onSwipeableOpen={handleSwipeableOpen}
        containerStyle={[
          { backgroundColor: Colors.CrimsonRed },
          containerStyle,
        ]}
        rightThreshold={1}
        dragOffsetFromRightEdge={halfSwipeableWidth}
      >
        <Pressable onPress={handlePress} style={styles.container} {...rest}>
          <View
            style={[
              styles.todoItemContent,
              completed && styles.completedContainer,
            ]}
          >
            {renderCategoryIcon(category)}
            <View style={styles.content}>
              <Text
                numberOfLines={1}
                style={[styles.title, completed && styles.completedText]}
              >
                {title}
              </Text>
              <Text
                style={[styles.dateTime, completed && styles.completedText]}
              >
                {formatDateTime(date, time)}
              </Text>
            </View>
          </View>
          <Pressable
            style={[
              styles.checkbox,
              completed && { backgroundColor: Colors.PrimaryPurple },
            ]}
            onPress={handleCheckboxPress}
          >
            {completed && <CheckIcon />}
          </Pressable>
        </Pressable>
      </Swipeable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.White,
  },
  todoItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  completedContainer: {
    opacity: 0.5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.PrimaryPurple,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: Colors.PrimaryPurple,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.CarbonBlack,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  dateTime: {
    fontSize: 14,
    color: Colors.CarbonBlack70,
  },
  deleteButton: {
    backgroundColor: Colors.CrimsonRed,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  deleteButtonText: {
    color: Colors.White,
    fontWeight: "bold",
  },
});

export default TodoItem;
