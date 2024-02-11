import React from 'react';
import {
  Modal,
  type NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  TextInput,
  type TextInputChangeEventData,
  View,
  Pressable,
  Keyboard,
} from 'react-native';

import AppButton from './AppButton';
import theme from '../constants/theme';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

interface Props {
  addModalIsOpen: boolean;
  closeAddModal: () => void;
  addItem: (inputValue: string) => void;
}
const AddModal = ({ addModalIsOpen, closeAddModal, addItem }: Props) => {
  const inputRef = React.useRef<TextInput>(null);
  const [inputValue, setInputValue] = React.useState('');
  React.useEffect(() => {
    if (addModalIsOpen) {
      inputRef?.current?.focus();
    }
  }, [addModalIsOpen]);
  const handleInputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setInputValue(e.nativeEvent.text);
  };
  const handleAddPress = () => {
    addItem(inputValue);
    setInputValue('');
    closeAddModal();
  };
  const handleClosePress = () => {
    setInputValue('');
    closeAddModal();
  };
  return (
    <Modal visible={addModalIsOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
          <View style={styles.innerContainer}>
            <AppButton
              text="X"
              style={styles.closeButton}
              textStyle={styles.closeButtonText}
              onPress={handleClosePress}
            />
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={inputValue}
              onChange={handleInputChange}
            />
            <AppButton
              text="Add"
              onPress={handleAddPress}
              style={styles.addButton}
              textStyle={styles.addButtonText}
              disabled={!inputValue}
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: horizontalScale(theme.spacing.spacing_16),
  },
  textInput: {
    backgroundColor: 'white',
    paddingHorizontal: horizontalScale(theme.spacing.spacing_16),
    paddingVertical: verticalScale(theme.spacing.spacing_16),
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: theme.spacing.spacing_4,
    marginTop: verticalScale(theme.spacing.spacing_12),
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_24),
    fontWeight: theme.fontWeight.bold,
  },
  addButton: {
    marginTop: verticalScale(theme.spacing.spacing_16),
    alignSelf: 'center',
  },
  addButtonText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_24),
    fontWeight: theme.fontWeight.fontWeight_500,
  },
});
