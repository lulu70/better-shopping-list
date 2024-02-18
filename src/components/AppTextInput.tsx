import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

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
  rightIcon?: string;
  onRightIconPress?: () => void;
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
}: Props) => {
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (autoFocus) inputRef?.current?.focus();
  }, [autoFocus]);

  return (
    <>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        onFocus={onfocus}
        onBlur={onBlur}
      />
      {rightIcon && onRightIconPress && (
        <AppButton
          text={rightIcon}
          onPress={onRightIconPress}
          style={styles.rightButton}
        />
      )}
    </>
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
    right: horizontalScale(theme.spacing.spacing_4),
    top: 0,
    paddingVertical: verticalScale(theme.spacing.spacing_16),
  },
});
