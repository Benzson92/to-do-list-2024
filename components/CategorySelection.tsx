// CategorySelection.tsx
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import { TodoCategoryType } from "@/types/todo/todo.type";
import Colors from "@/theme/colors";

interface CategoryOption {
  type: TodoCategoryType;
  icon: React.FC;
}

interface CategorySelectionProps {
  options: CategoryOption[];
  selectedCategory?: TodoCategoryType;
  onSelectCategory: (category: TodoCategoryType) => void;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  options,
  selectedCategory,
  onSelectCategory,
  errorMessage,
  style,
}) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.categoryLabel}>Category</Text>
        <View style={styles.categoryContainer}>
          {options.map((option) => (
            <Pressable
              key={option.type}
              onPress={() => onSelectCategory(option.type)}
            >
              <View
                style={[
                  styles.iconWrapper,
                  selectedCategory === option.type &&
                    styles.selectedIconWrapper,
                ]}
              >
                <option.icon />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default CategorySelection;

const styles = StyleSheet.create({
  categoryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.CarbonBlack,
    marginRight: 12,
    // marginBottom: 8,
    // paddingHorizontal: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    // marginVertical: 16,
    // paddingHorizontal: 16,
  },
  iconWrapper: {
    marginHorizontal: 10,
    borderColor: Colors.White,
    borderWidth: 2,
    borderRadius: 50,
  },
  selectedIconWrapper: {
    borderColor: Colors.PrimaryPurple,
  },
  errorText: {
    color: Colors.CrimsonRed,
    fontSize: 12,
    marginVertical: 8,
    // marginTop: -8,
    // marginBottom: 8,
    // marginHorizontal: 16,
  },
});
