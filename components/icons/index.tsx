import { Image, type ImageProps } from "react-native";

export const IconChecked = (props: ImageProps) => (
  <Image source={require("@/assets/icons/radio-checked.png")} {...props} />
);

export const IconUnchecked = (props: ImageProps) => (
  <Image source={require("@/assets/icons/radio-unchecked.png")} {...props} />
);

export const IconArrow = (props: ImageProps) => (
  <Image source={require("@/assets/icons/arrow-select.png")} {...props} />
);
