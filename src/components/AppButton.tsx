import React from 'react';
import { Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';
interface Props {
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
const AppButton = ({
  children,
  text,
  style,
  textStyle,
  onPress,
  disabled = false,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        { ...style },
      ]}
      disabled={disabled}
    >
      {text ? (
        <Text
          style={[
            {
              opacity: disabled ? 0.2 : 1,
            },
            { ...textStyle },
          ]}
        >
          {text}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default AppButton;
