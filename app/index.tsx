// React and React Native imports
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  ListRenderItem,
} from "react-native";
import { Link } from "expo-router";
import isEmpty from "lodash/isEmpty";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Hooks
import { useTodos } from "../hooks/useTodos.hook";

// Components
import TodoList from "../components/TodoList";
import TodoItem from "../components/TodoItem";
import PrimaryButton from "../components/buttons/PrimaryButton";
import HomeHeaderBackground from "../components/headers/HomeHeaderBackground";
import WelcomeCats from "../components/icons/WelcomeCats.icon"; // Import the WelcomeCats component

// Utilities
import { getCurrentFormattedDate } from "../utils/dateTime.util";

// Styles
import Colors from "@/theme/colors";

// Types
import { TodoItemDTO } from "../models/todo/todo.dto";

const HomePage: React.FC = () => {
  const {
    // todos,
    completedTodos,
    todayIncompleteTodos,
    toggleTodoStatus,
    removeTodo,
  } = useTodos();
  const { width: screenWidth } = useWindowDimensions();
  // const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const currentDate = getCurrentFormattedDate();

  const headerBackgroundHeight = 222 + insets.top;

  console.log("HomePage completedTodos", completedTodos);
  console.log("HomePage todayIncompleteTodos", todayIncompleteTodos);
  console.log("HomePage insets", insets);

  const handleTodoItemPress = (id: string) => {
    // navigation.navigate("/edit/[id]", { params: { id } });
    router.navigate(`/edit/${id}`);
  };

  const renderTodoItem = (
    { item, index }: { item: TodoItemDTO; index: number },
    listData: TodoItemDTO[]
  ) => (
    // <Link
    //   href={{
    //     pathname: "/edit/[id]",
    //     params: { id: item.id },
    //   }}
    //   asChild
    // >
    //   <TodoItem
    //     data={item}
    //     onSwipeLeft={(id) => removeTodo(id)}
    //     onCheckboxPress={(id) => toggleTodoStatus(id)}
    //   />
    // </Link>
    <TodoItem
      data={item}
      onTodoItemPress={handleTodoItemPress}
      onSwipeLeft={(id) => removeTodo(id)}
      onCheckboxPress={(id) => toggleTodoStatus(id)}
      containerStyle={[
        index === 0 && { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
        index === listData.length - 1 && {
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
      ]}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <WelcomeCats width={screenWidth * 0.8} />
      {/* <Text style={styles.emptyStateText}>Your todo list is empty!</Text> */}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.headerBackgroundContainer}>
        <HomeHeaderBackground
          width={screenWidth}
          height={headerBackgroundHeight}
        />
        <View
          style={[
            styles.headerContent,
            {
              top: insets.top,
            },
          ]}
        >
          <Text
            style={[
              styles.dateText,
              {
                // top: 36 + insets.top,
                // top: insets.top > 0 ? 16 + insets.top : 36,
              },
            ]}
          >
            {currentDate}
          </Text>
          <Text style={styles.headerText}>My Todo List</Text>

          {/* <Text style={[styles.headerText, { top: 222 / 2 }]}>
            My Todo List
          </Text> */}
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.FrostedSilver,
          flexGrow: 1,
          paddingBottom: insets.bottom,
          position: "relative",
        }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={{
            position: "relative",
            // backgroundColor: Colors.DarkBrown,
            marginTop: isEmpty(todayIncompleteTodos) ? 0 : -64,
          }}
        >
          {isEmpty(completedTodos) && isEmpty(todayIncompleteTodos) ? (
            renderEmptyState()
          ) : (
            <>
              <View
                style={[
                  styles.section,
                  {
                    // marginTop: -64,
                  },
                ]}
              >
                {/* <Text style={styles.subHeader}>Incomplete</Text> */}
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

          {/* <View style={{ flex: 1 }} /> */}

          {/* <Link href="/add" asChild>
          <PrimaryButton title="Add New Task" style={styles.addButton} />
        </Link> */}
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
  safeArea: {
    flex: 1,
    backgroundColor: Colors.FrostedSilver,
    position: "relative",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    // paddingTop: 16, // Adjusted padding top to avoid overlap with header
  },
  headerBackgroundContainer: {
    position: "relative",
    // height: 96,
    // marginBottom: 16,
  },
  headerContent: {
    // position: "absolute",
    // top: 0,
    ...StyleSheet.absoluteFillObject,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.White,
    textAlign: "center",
    marginTop: 36,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.White,
    textAlign: "center",
    marginTop: 24,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 24,
  },
  section: {
    // marginBottom: 20,
  },
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
});
