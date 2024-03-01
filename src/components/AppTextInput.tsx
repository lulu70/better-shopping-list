import React from 'react';
import { StyleSheet, TextInput, TextStyle, View } from 'react-native';

import AppButton from './AppButton';
import theme from '../constants/theme';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  onfocus?: () => void;
  onBlur?: () => void;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  leftIcon?: React.ReactNode;
  maxLength?: number;
  style?: TextStyle;
}

const AppTextInput = ({
  value,
  onChangeText,
  autoFocus = false,
  placeholder,
  onfocus,
  onBlur,
  rightIcon,
  onRightIconPress,
  leftIcon,
  maxLength = 28,
  style,
}: Props) => {
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (autoFocus) inputRef?.current?.focus();
  }, [autoFocus]);

  return (
    <View style={styles.container}>
      <View style={styles.leftIcon}>{leftIcon}</View>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text_disabled}
        maxLength={maxLength}
        style={[
          styles.textInput,
          {
            paddingHorizontal: leftIcon
              ? horizontalScale(theme.spacing.spacing_4)
              : horizontalScale(theme.spacing.spacing_16),
          },
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={onfocus}
        onBlur={onBlur}
      />
      {rightIcon && onRightIconPress && (
        <AppButton onPress={onRightIconPress} style={styles.rightButton}>
          {rightIcon}
        </AppButton>
      )}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray_100,
    alignItems: 'center',
    borderRadius: theme.spacing.spacing_24,
    overflow: 'hidden',
  },
  leftIcon: {
    paddingLeft: horizontalScale(theme.spacing.spacing_8),
  },
  textInput: {
    backgroundColor: theme.colors.gray_100,
    paddingVertical: verticalScale(theme.spacing.spacing_12),
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
    flexGrow: 1,
  },
  rightButton: {
    paddingRight: horizontalScale(theme.spacing.spacing_8),
  },
});
