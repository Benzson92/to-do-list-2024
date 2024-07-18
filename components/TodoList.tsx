// React and React Native imports
import React from "react";
import {
  FlatList,
  StyleSheet,
  FlatListProps,
  View,
  ListRenderItem,
} from "react-native";

// Type imports
import { TodoItemDTO } from "../models/todo/todo.dto";

import Colors from "@/theme/colors"; // Import colors

const ItemSeparatorComponent = () => <View style={styles.separator} />;

interface TodoListProps extends FlatListProps<TodoItemDTO> {
  renderItem: ListRenderItem<TodoItemDTO>;
}

const TodoList: React.FC<TodoListProps> = ({ data, renderItem, ...rest }) => {
  console.log("TodoList data", data);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={ItemSeparatorComponent}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    // borderRadius: 16,
    // overflow: "hidden",
    // backgroundColor: Colors.GoldenYellow,
    // flex: 1,
  },
  contentContainer: {
    // paddingHorizontal: 16,
    // paddingBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.MistGray,
  },
});

export default TodoList;
