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

  style,
}: Props) => {
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (autoFocus) inputRef?.current?.focus();
  }, [autoFocus]);

  return (
    <View>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        style={[styles.textInput, style]}
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
  textInput: {
    backgroundColor: 'white',
    paddingHorizontal: horizontalScale(theme.spacing.spacing_16),
    paddingVertical: verticalScale(theme.spacing.spacing_12),
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
  },
  rightButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '50%',
    transform: [{ translateY: -horizontalScale(theme.spacing.spacing_12) }],
  },
});
