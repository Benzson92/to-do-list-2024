const Colors = {
  // Primary Colors
  PrimaryPurple: "#4A3780", // Main purple color
  // MediumPurple: "#5D3FD3", // Main purple color (commented out)
  // LavenderMist: "#E7E2F3", // Light purple background (commented out)

  // Secondary Colors
  // PaleYellow: "#FEF5D3", // Light yellow background
  // AliceBlue: "#DBECF6", // Light blue background

  // Text Colors
  Charcoal: "#333333",
  DimGray: "#666666",
  SilverGray: "#999999",
  CarbonBlack70: "rgba(27, 27, 29, 0.7)", // Semi-transparent dark gray
  CarbonBlack: "rgba(27, 27, 29, 1)", // Very dark gray, almost black (fully opaque)

  // UI Colors
  White: "#FFFFFF",
  SnowWhite: "#FFFFFF",
  LightGray: "#E0E0E0",
  FrostedSilver: "#F1F5F9", // Very light grayish blue
  MistGray: "#E5E9ED", // Light grayish blue

  // Status Colors
  LeafGreen: "#4CAF50",
  CrimsonRed: "#F44336",
  GoldenYellow: "#FFC107",
  SkyBlue: "#2196F3",

  // Category Colors
  PowderBlue: "#DBECF6", // Light blue
  LilacMist: "#E7E2F3", // Light purple
  CreamYellow: "#FEF5D3", // Light yellow

  // Icon Colors
  OceanDepth: "#194A66", // Deep blue-green
  DarkBrown: "#403100", // Dark brown color
  MidnightNavy: "#14142B", // Very dark blue, almost black
};

export type ColorName = keyof typeof Colors;

export default Colors;
