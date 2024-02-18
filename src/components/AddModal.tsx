import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Keyboard,
} from 'react-native';

import AppButton from './AppButton';
import AppTextInput from './AppTextInput';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

const AddModal = () => {
  const { addItem, addModalIsOpen, closeAddModal } =
    React.useContext(MainContext);
  const [inputValue, setInputValue] = React.useState('');

  const resetAddModalState = () => {
    setInputValue('');
    closeAddModal();
  };
  const handleAddPress = () => {
    addItem(inputValue);
    resetAddModalState();
  };
  const handleClosePress = () => {
    resetAddModalState();
  };
  const onChangeText = (text: string) => {
    setInputValue(text);
  };
  const handleOutsidePress = () => {
    if (!inputValue) {
      resetAddModalState();
      Keyboard.dismiss();
    }
  };
  return (
    <Modal visible={addModalIsOpen} animationType="slide" transparent>
      <SafeAreaView style={styles.container}>
        <Pressable onPress={handleOutsidePress} style={styles.pressable}>
          <View style={styles.innerContainer}>
            <AppButton
              text="X"
              style={styles.closeButton}
              textStyle={styles.closeButtonText}
              onPress={handleClosePress}
            />
            <AppTextInput
              value={inputValue}
              onChangeText={onChangeText}
              style={styles.textInput}
              autoFocus
              placeholder="Add an item here"
            />
            <AppButton
              text="+"
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
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: theme.colors.background_secondary,
    height: verticalScale(theme.spacing.spacing_256),
    marginTop: verticalScale(theme.spacing.spacing_64),
    marginHorizontal: horizontalScale(theme.spacing.spacing_16),
    zIndex: 10,
  },
  textInput: {
    marginHorizontal: horizontalScale(theme.spacing.spacing_16),
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
    flex: 1,
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: horizontalScale(theme.fontSize.fontSize_32),
    fontWeight: theme.fontWeight.bold,
  },
});
