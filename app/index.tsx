import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import isEmpty from "lodash/isEmpty";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTodos } from "../hooks/useTodos.hook";

import TodoList from "../components/TodoList";
import TodoItem from "../components/TodoItem";
import PrimaryButton from "../components/buttons/PrimaryButton";
import WelcomeCats from "../components/icons/WelcomeCats.icon";
import HomeHeader from "../components/headers/HomeHeader";

import { getCurrentFormattedDate } from "../utils/dateTime.util";

import Colors from "@/theme/colors";

import { TodoItemDTO } from "../models/todo/todo.dto";

const HomePage: React.FC = () => {
  const { completedTodos, todayIncompleteTodos, toggleTodoStatus, removeTodo } =
    useTodos();
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const currentDate = getCurrentFormattedDate();

  const handleTodoItemPress = (id: string) => {
    router.navigate(`/edit/${id}`);
  };

  const renderTodoItem = (
    { item, index }: { item: TodoItemDTO; index: number },
    listData: TodoItemDTO[]
  ) => (
    <TodoItem
      data={item}
      onTodoItemPress={handleTodoItemPress}
      onSwipeLeft={(id) => removeTodo(id)}
      onCheckboxPress={(id) => toggleTodoStatus(id)}
      containerStyle={[
        index === 0 && styles.firstTodoItem,
        index === listData.length - 1 && styles.lastTodoItem,
      ]}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <WelcomeCats width={screenWidth * 0.8} />
    </View>
  );

  return (
    <View style={styles.container}>
      <HomeHeader currentDate={currentDate} />
      <View style={[styles.content, { paddingBottom: insets.bottom }]}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={{
            position: "relative",
            marginTop: isEmpty(todayIncompleteTodos) ? 0 : -64,
          }}
        >
          {isEmpty(completedTodos) && isEmpty(todayIncompleteTodos) ? (
            renderEmptyState()
          ) : (
            <>
              <View style={styles.section}>
                <TodoList
                  data={todayIncompleteTodos}
                  renderItem={(info) =>
                    renderTodoItem(info, todayIncompleteTodos)
                  }
                  scrollEnabled={false}
                />
              </View>

              <View style={styles.section}>
                {!isEmpty(completedTodos) && (
                  <Text style={styles.subHeader}>Completed</Text>
                )}
                <TodoList
                  data={completedTodos}
                  renderItem={(info) => renderTodoItem(info, completedTodos)}
                  scrollEnabled={false}
                />
              </View>
            </>
          )}
        </ScrollView>

        <Link href="/add" asChild>
          <PrimaryButton title="Add New Task" style={styles.addButton} />
        </Link>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.FrostedSilver,
    position: "relative",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: Colors.FrostedSilver,
    flexGrow: 1,
    position: "relative",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 24,
  },
  section: {},
  addButton: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginVertical: 20,
  },
  firstTodoItem: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  lastTodoItem: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
