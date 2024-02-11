import React from 'react';
import {
  type NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  type TextInputChangeEventData,
  View,
} from 'react-native';

import AppButton from './AppButton';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';
import { type ItemWithId } from '../screens/Main';

interface Props {
  item: ItemWithId;
}

const ListItem = ({ item }: Props) => {
  const { changeCheckedItem, deleteItem, editItem } =
    React.useContext(MainContext);

  const handleItemChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    editItem(item.id, e.nativeEvent.text);
  };
  return (
    <View style={styles.listItem} key={item.id}>
      <AppButton
        onPress={() => {
          changeCheckedItem(item.id);
        }}
        text={item.checked ? '✔️' : '◯'}
        textStyle={styles.checkedIcon}
      />
      <TextInput
        value={item.content}
        onChange={handleItemChange}
        style={styles.textInput}
      />
      <AppButton
        text="🗑️"
        style={styles.trashIcon}
        textStyle={styles.trashIconText}
        onPress={() => {
          deleteItem(item.id);
        }}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    marginTop: verticalScale(theme.spacing.spacing_12),
    paddingVertical: verticalScale(theme.spacing.spacing_8),
    alignItems: 'center',
  },
  checkedIcon: {
    marginRight: horizontalScale(theme.spacing.spacing_12),
    fontSize: horizontalScale(theme.fontSize.fontSize_24),
  },
  trashIcon: {
    marginLeft: 'auto',
  },
  trashIconText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
  },
  textInput: {
    flex: 1,
    fontSize: horizontalScale(theme.fontSize.fontSize_20),
  },
});
