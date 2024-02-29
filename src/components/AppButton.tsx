import React from 'react';
import { Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';
interface Props {
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
  pressedOpacity?: number;
  hitSlop?: number;
  children?: React.ReactNode;
}
const AppButton = ({
  children,
  text,
  style,
  textStyle,
  onPress,
  disabled = false,
  pressedOpacity = 0.5,
  hitSlop = 10,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        {
          opacity: pressed ? pressedOpacity : disabled ? 0.2 : 1,
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
