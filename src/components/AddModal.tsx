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
import AddIcon from '../Icons/AddIcons';
import CloseIcon from '../Icons/CloseIcon';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';

const AddModal = () => {
  const { addItem, addModalIsOpen, closeAddModal } =
    React.useContext(MainContext);
  const [inputValue, setInputValue] = React.useState('');

  const resetInputValue = () => {
    setInputValue('');
  };
  const resetAddModalState = () => {
    setInputValue('');
    closeAddModal();
  };
  const handleAddPress = () => {
    if (!inputValue) return;
    addItem(inputValue);
    resetAddModalState();
  };
  const onChangeText = (text: string) => {
    setInputValue(text);
  };
  const handleOutsidePress = () => {
    resetAddModalState();
    Keyboard.dismiss();
  };
  return (
    <Modal visible={addModalIsOpen} animationType="slide" transparent>
      <SafeAreaView style={styles.container}>
        <Pressable onPress={handleOutsidePress} style={styles.pressable}>
          <View style={styles.innerContainer}>
            <AppTextInput
              value={inputValue}
              onChangeText={onChangeText}
              isFocused
              placeholder="Add an item here"
              rightIcon={inputValue.length > 0 && <CloseIcon />}
              onRightIconPress={resetInputValue}
            />
            <AppButton
              onPress={handleAddPress}
              style={{ ...styles.addButton, opacity: inputValue ? 1 : 0.2 }}
              pressedOpacity={1}
            >
              <AddIcon />
            </AppButton>
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
    backgroundColor: theme.colors.backdrop,
  },
  pressable: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: theme.colors.background,
    height: verticalScale(theme.spacing.spacing_256),
    marginTop: verticalScale(theme.spacing.spacing_96),
    marginHorizontal: horizontalScale(theme.spacing.spacing_16),
    paddingHorizontal: horizontalScale(theme.spacing.spacing_12),
    paddingVertical: verticalScale(theme.spacing.spacing_12),
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_24),
    fontWeight: theme.fontWeight.bold,
  },
  addButton: {
    marginTop: verticalScale(theme.spacing.spacing_20),
    flex: 1,
    alignItems: 'center',
  },
});
