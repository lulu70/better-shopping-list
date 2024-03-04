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
  scrollToItem: (item: ItemWithId) => void;
  thereAreHiddenItems: boolean;
}

const ListItem = ({ item, scrollToItem, thereAreHiddenItems }: Props) => {
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
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (itemInEditMode?.id === item.id && thereAreHiddenItems) {
      scrollToItem(item);
    }
  }, [itemInEditMode]);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (thereAreHiddenItems && !item.checked) {
      scrollToItem(item);
    }
  }, [item.updatedAt]);

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
  const handleCheckPress = () => {
    changeCheckedItem(item.id);
  };

  return (
    <View style={styles.listItem} key={item.id}>
      <AppButton
        style={styles.checkButton}
        onPress={handleCheckPress}
        disabled={isSearching || inEditMode}
      >
        {item.checked ? <CheckIcon /> : <RadioButtonIcon />}
      </AppButton>
      <AppButton
        style={styles.contentWrapper}
        onPress={handleContentWrapperPress}
        disabled={isSearching}
        hitSlop={0}
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
    alignItems: 'center',
  },
  contentWrapper: {
    paddingVertical: verticalScale(theme.spacing.spacing_16),
    flex: 1,
  },
  checkButton: {
    marginRight: horizontalScale(theme.spacing.spacing_12),
  },
  contentText: {
    fontSize: horizontalScale(theme.fontSize.fontSize_18),
    lineHeight: verticalScale(theme.fontSize.fontSize_20),
  },
  contentTextInEditMode: {
    color: theme.colors.edit,
  },
});
