import React, { useState, forwardRef, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  PanResponder,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

// Types
import { TodoCategoryType } from "@/types/todo/todo.type";
import { TodoItemDTO } from "../models/todo/todo.dto";

// Utilities
import { formatDateTime } from "../utils/dateTime.util";

// Constants
import Colors from "@/theme/colors";

// Components
import CalendarEventIcon from "./icons/CalendarEvent.icon";
import DocumentIcon from "./icons/Document.icon";
import TrophyIcon from "./icons/Trophy.icon";
import CheckIcon from "./icons/Check.icon";

// Create a mapping of category to icon component
const categoryIconMap: Record<TodoCategoryType, React.FC> = {
  Scheduled: CalendarEventIcon,
  General: DocumentIcon,
  Goal: TrophyIcon,
};

// Function to render the icon based on category
const renderCategoryIcon = (category: TodoCategoryType): React.ReactNode => {
  const IconComponent = categoryIconMap[category] || DocumentIcon; // Default to DocumentIcon if category not found
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
    const [isSwipeOpen, setIsSwipeOpen] = useState(false);
    const swipeActionPerformedRef = useRef(false);
    const isSwiping = useRef(false);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          console.log("TodoItem onMoveShouldSetPanResponder");

          // Only respond to horizontal movements
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        },
        onPanResponderGrant: (_, gestureState) => {
          isSwiping.current = true;

          console.log(
            "TodoItem onPanResponderGrant gestureState",
            gestureState
          );
        },
        onPanResponderMove: (_, gestureState) => {
          console.log("TodoItem onPanResponderMove gestureState", gestureState);
        },
        onPanResponderRelease: () => {
          console.log("TodoItem onPanResponderRelease");

          // Reset the swiping flag after a short delay
          setTimeout(() => {
            isSwiping.current = false;
          }, 250);
        },
      })
    ).current;

    const { width: screenWidth } = useWindowDimensions();
    const halfScreenWidth = screenWidth / 2;

    // const handlePress = useCallback(() => {
    //   console.log(
    //     "TodoItem handlePress swipeActionPerformedRef",
    //     swipeActionPerformedRef.current
    //   );

    //   if (!isSwipeOpen && !swipeActionPerformedRef.current) {
    //     onTodoItemPress?.(id);
    //   }

    //   swipeActionPerformedRef.current = false;
    // }, [isSwipeOpen, onTodoItemPress, id]);

    const handlePress = useCallback(() => {
      if (!isSwiping.current && !isSwipeOpen) {
        console.log("TodoItem handlePress - Triggering onTodoItemPress");

        setTimeout(() => {
          console.log(
            "TodoItem handlePress setTimeout - Triggering onTodoItemPress isSwipeOpen",
            isSwipeOpen
          );
          console.log(
            "TodoItem handlePress setTimeout - Triggering onTodoItemPress swipeActionPerformedRef",
            swipeActionPerformedRef.current
          );

          if (!swipeActionPerformedRef.current) onTodoItemPress?.(id);

          swipeActionPerformedRef.current = false;
          setIsSwipeOpen(false);
        }, 500);
      } else {
        console.log(
          "TodoItem handlePress - Swipe detected, not triggering press"
        );
      }
    }, [isSwipeOpen, onTodoItemPress, id]);

    const handleCheckboxPress = useCallback(() => {
      onCheckboxPress(id);
    }, [onCheckboxPress, id]);

    const renderRightActions = () => (
      <View style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </View>
    );

    const handleSwipeableWillOpen = useCallback(
      (direction: "left" | "right") => {
        console.log("TodoItem onSwipeableWillOpen direction", direction);

        setIsSwipeOpen(true);
        swipeActionPerformedRef.current = true;
      },
      []
    );

    const handleSwipeableOpen = useCallback(
      (direction: "left" | "right") => {
        console.log("TodoItem onSwipeableOpen direction", direction);

        // swipeActionPerformedRef.current = true;

        if (direction === "right") {
          console.log("TodoItem onSwipeableOpen Swiped left");
          onSwipeLeft(id);
        }
      },
      [onSwipeLeft, id]
    );

    const handleSwipeableClose = useCallback(() => {
      setTimeout(() => {
        console.log(
          "TodoItem onSwipeableClose isSwipeOpen setTimeout",
          isSwipeOpen
        );
        console.log(
          "TodoItem onSwipeableClose swipeActionPerformedRef setTimeout",
          swipeActionPerformedRef.current
        );

        // setIsSwipeOpen(false);
      }, 500);

      console.log("TodoItem onSwipeableClose");
    }, []);

    return (
      <Swipeable
        ref={ref}
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={handleSwipeableWillOpen}
        onSwipeableWillClose={() => {
          console.log("TodoItem onSwipeableWillClose");
        }}
        onSwipeableOpen={handleSwipeableOpen}
        onSwipeableClose={handleSwipeableClose}
        containerStyle={[
          { backgroundColor: Colors.CrimsonRed },
          containerStyle,
        ]}
        rightThreshold={1}
        dragOffsetFromRightEdge={halfScreenWidth}
      >
        <Pressable
          {...panResponder.panHandlers}
          unstable_pressDelay={500}
          onPressIn={() => {
            console.log("TodoItem onPressIn");
          }}
          onPressOut={() => {
            console.log("TodoItem onPressOut");
          }}
          onLongPress={() => {
            console.log("TodoItem onLongPress");
          }}
          onPress={handlePress}
          style={styles.container}
          {...rest}
        >
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              },
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
    padding: 15,
    backgroundColor: Colors.White,
    // borderRadius: 10,
  },
  completedContainer: {
    opacity: 0.7,
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
    color: Colors.CarbonBlack,
    opacity: 0.7,
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
