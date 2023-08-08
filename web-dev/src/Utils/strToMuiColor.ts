type MuiColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

// hash the string and generate a random color
export const strToMuiColor = (str: string): MuiColor => {
  const hash = str.split("").reduce((acc, char) => {
    return acc + (char.charCodeAt(0) % 11);
  }, 0);

  const colorSchemes: MuiColor[] = [
    "default",
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning"
  ];
  return colorSchemes[hash % colorSchemes.length];
};
