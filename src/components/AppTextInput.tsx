import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import theme from '../constants/theme';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
}

const AppTextInput = ({
  value,
  onChangeText,
  autoFocus = false,
  placeholder,
}: Props) => {
  const inputRef = React.useRef<TextInput>(null);
  React.useEffect(() => {
    if (autoFocus) inputRef?.current?.focus();
  }, [autoFocus]);
  return (
    <TextInput
      ref={inputRef}
      placeholder={placeholder}
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    paddingHorizontal: horizontalScale(theme.spacing.spacing_16),
    paddingVertical: verticalScale(theme.spacing.spacing_12),
    marginTop: verticalScale(theme.spacing.spacing_12),
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
  },
});
