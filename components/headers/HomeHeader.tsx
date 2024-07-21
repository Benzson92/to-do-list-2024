import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeHeaderBackground from "./HomeHeaderBackground";

import Colors from "@/theme/colors";

interface HomeHeaderProps {
  currentDate: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ currentDate }) => {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const headerBackgroundHeight = 222 + insets.top;

  return (
    <View style={styles.headerBackgroundContainer}>
      <HomeHeaderBackground
        width={screenWidth}
        height={headerBackgroundHeight}
      />
      <View style={[styles.headerContent, { top: insets.top }]}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <Text style={styles.headerText}>My Todo List</Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerBackgroundContainer: {
    position: "relative",
  },
  headerContent: {
    ...StyleSheet.absoluteFillObject,
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
});
