import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CloseIcon from "../icons/Close.icon";
import RouteHeaderBackground from "./RouteHeaderBackground";

import Colors from "@/theme/colors";

interface RouteHeaderProps {
  onClose: () => void;
  title: string;
}

const RouteHeader: React.FC<RouteHeaderProps> = ({ onClose, title }) => {
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const headerBackgroundHeight = 96 + insets.top;

  return (
    <View style={styles.headerBackgroundContainer}>
      <RouteHeaderBackground
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
        <Text style={styles.headerText}>{title}</Text>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <CloseIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default RouteHeader;

const styles = StyleSheet.create({
  headerBackgroundContainer: {
    position: "relative",
    // height: 96,
    // marginBottom: 16,
  },
  headerContent: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    // paddingHorizontal: 16,
  },
  closeButton: {
    position: "absolute",
    left: 16,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.White,
    textAlign: "center",
  },
});
