import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from './AppButton';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';
import { type ItemWithId } from '../screens/Main';

interface Props {
  item: ItemWithId;
}

const ListItem = ({ item }: Props) => {
  const { changeCheckedItem, deleteItem } = React.useContext(MainContext);
  return (
    <View style={styles.listItem} key={item.id}>
      <AppButton
        onPress={() => {
          changeCheckedItem(item.id);
        }}
        text={item.checked ? '✔️' : '◯'}
        textStyle={styles.checkedIcon}
      />
      <Text>{item.content}</Text>
      <AppButton
        text="🗑️"
        style={styles.trashIcon}
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
  },
  checkedIcon: { marginRight: horizontalScale(theme.spacing.spacing_12) },
  trashIcon: {
    marginLeft: 'auto',
  },
});
