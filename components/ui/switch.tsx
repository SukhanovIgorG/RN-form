import { COLORS } from "@/tokens";
import { Switch as RNSwitch, SwitchProps } from "react-native";

export const Switch = ({ ...props }: SwitchProps) => {
  return (
    <RNSwitch
      trackColor={{
        false: COLORS.lightGray,
        true: COLORS.lightBlue,
      }}
      {...props}
    />
  );
};
