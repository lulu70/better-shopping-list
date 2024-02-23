import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import AppButton from './AppButton';
import CheckIcon from '../Icons/CheckIcon';
import RadioButtonIcon from '../Icons/RadioButtonIcon';
import TrashIcon from '../Icons/TrashIcon';
import theme from '../constants/theme';
import MainContext from '../context/MainContext/MainContext';
import SearchContext from '../context/SearchContext/SearchContext';
import { horizontalScale, verticalScale } from '../helpers/scaleHelpers';
import { type ItemWithId } from '../screens/Main';

interface Props {
  item: ItemWithId;
}

const ListItem = ({ item }: Props) => {
  const { changeCheckedItem, deleteItem, editItem } =
    React.useContext(MainContext);
  const { isSearching } = React.useContext(SearchContext);
  const [itemContent, setItemContent] = React.useState(item.content);

  const handleItemChange = (text: string) => {
    setItemContent(text);
  };
  const handleInputBlur = () => {
    if (itemContent !== item.content) {
      editItem(item.id, itemContent);
    }
  };
  return (
    <View style={styles.listItem} key={item.id}>
      <AppButton
        onPress={() => {
          changeCheckedItem(item.id);
        }}
        disabled={isSearching}
      >
        {item.checked ? <CheckIcon /> : <RadioButtonIcon />}
      </AppButton>
      <TextInput
        value={itemContent}
        onChangeText={handleItemChange}
        style={[
          styles.textInput,
          {
            color: isSearching
              ? theme.colors.text_disabled
              : theme.colors.text_black,
          },
        ]}
        editable={!isSearching}
        onBlur={handleInputBlur}
        multiline
      />
      <AppButton
        onPress={() => {
          deleteItem(item.id);
        }}
        disabled={isSearching}
      >
        <TrashIcon />
      </AppButton>
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
  textInput: {
    flex: 1,
    fontSize: horizontalScale(theme.fontSize.fontSize_18),
    lineHeight: verticalScale(theme.fontSize.fontSize_20),
    marginHorizontal: horizontalScale(theme.spacing.spacing_12),
  },
});
