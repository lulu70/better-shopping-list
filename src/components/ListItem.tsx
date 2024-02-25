import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

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
  const {
    changeCheckedItem,
    deleteItem,
    editItem,
    goIntoEditMode,
    getOutOfEditMode,
    itemInEditMode,
    inEditMode,
  } = React.useContext(MainContext);
  const { isSearching } = React.useContext(SearchContext);
  const [itemContent, setItemContent] = React.useState(item.content);

  const handleItemChange = (text: string) => {
    setItemContent(text);
  };
  const handleInputBlur = () => {
    if (itemContent !== item.content) {
      editItem(item.id, itemContent);
    }
    getOutOfEditMode();
  };
  const handleContentWrapperPress = () => {
    goIntoEditMode(item);
  };
  return (
    <View style={styles.listItem} key={item.id}>
      <AppButton
        onPress={() => {
          changeCheckedItem(item.id);
        }}
        disabled={isSearching || inEditMode}
      >
        {item.checked ? <CheckIcon /> : <RadioButtonIcon />}
      </AppButton>
      <AppButton
        style={styles.contentWrapper}
        onPress={handleContentWrapperPress}
        disabled={isSearching}
      >
        {itemInEditMode?.id === item.id ? (
          <TextInput
            value={itemContent}
            onChangeText={handleItemChange}
            style={[styles.contentText, styles.contentTextInEditMode]}
            editable={!isSearching}
            onBlur={handleInputBlur}
            multiline
            autoFocus
          />
        ) : (
          <Text style={styles.contentText}>{itemContent}</Text>
        )}
      </AppButton>
      <AppButton
        onPress={() => {
          deleteItem(item.id);
        }}
        disabled={isSearching || inEditMode}
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
  contentWrapper: {
    flex: 1,
  },
  contentText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_18),
    lineHeight: verticalScale(theme.fontSize.fontSize_20),
    marginHorizontal: horizontalScale(theme.spacing.spacing_12),
  },
  contentTextInEditMode: {
    color: theme.colors.edit,
  },
});
