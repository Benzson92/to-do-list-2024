import React, { memo } from "react";
import {
  FlatList,
  StyleSheet,
  FlatListProps,
  View,
  ListRenderItem,
} from "react-native";

import { TodoItemDTO } from "../models/todo/todo.dto";

import Colors from "@/theme/colors"; // Import colors

const ItemSeparatorComponent = () => <View style={styles.separator} />;

interface TodoListProps extends FlatListProps<TodoItemDTO> {
  renderItem: ListRenderItem<TodoItemDTO>;
}

const TodoList: React.FC<TodoListProps> = ({ data, renderItem, ...rest }) => {
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

export default memo(TodoList);

const styles = StyleSheet.create({
  list: {},
  contentContainer: {},
  separator: {
    height: 1,
    backgroundColor: Colors.MistGray,
  },
});
