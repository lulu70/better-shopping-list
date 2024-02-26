import { fireEvent, render, screen } from '@testing-library/react-native';

import ListItem from '../ListItem';

const mockChangeCheckedItem = jest.fn();
const mockDeleteItem = jest.fn();
const mockEditItem = jest.fn();
const mockGoIntoEditMode = jest.fn();
const mockGetOutOfEditMode = jest.fn();
const mockMainContextReturnValue = {
  changeCheckedItem: mockChangeCheckedItem,
  deleteItem: mockDeleteItem,
  editItem: mockEditItem,
  goIntoEditMode: mockGoIntoEditMode,
  getOutOfEditMode: mockGetOutOfEditMode,
  itemInEditMode: null,
  inEditMode: false,
};
const mockSearchContextReturnValue = {
  isSearching: false,
};

const mockScrollToTop = jest.fn();
const mockScrollToItem = jest.fn();

const sampleItem = {
  id: '1631067373',
  checked: false,
  content: 'bread',
  updatedAt: 1631067373,
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest
    .fn()
    .mockImplementationOnce(() => mockMainContextReturnValue)
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => mockMainContextReturnValue)
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => mockMainContextReturnValue)
    .mockImplementationOnce(() => ({
      isSearching: true,
    }))
    .mockImplementationOnce(() => mockMainContextReturnValue)
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => mockMainContextReturnValue)
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => mockMainContextReturnValue)
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => ({
      ...mockMainContextReturnValue,
      itemInEditMode: sampleItem,
      inEditMode: true,
    }))
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => ({
      ...mockMainContextReturnValue,
      itemInEditMode: sampleItem,
      inEditMode: true,
    }))
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => ({
      ...mockMainContextReturnValue,
      itemInEditMode: sampleItem,
      inEditMode: true,
    }))
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => ({
      ...mockMainContextReturnValue,
      itemInEditMode: sampleItem,
      inEditMode: true,
    }))
    .mockImplementationOnce(() => mockSearchContextReturnValue),
}));

beforeEach(() => {
  jest.clearAllMocks();
});
describe('ListItem', () => {
  it('should match snapshot unchecked', () => {
    render(
      <ListItem
        item={sampleItem}
        scrollToTop={mockScrollToTop}
        scrollToItem={mockScrollToItem}
      />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should match snapshot checked', () => {
    render(
      <ListItem
        item={{ ...sampleItem, checked: true }}
        scrollToTop={mockScrollToTop}
        scrollToItem={mockScrollToItem}
      />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should match snapshot in searching state', () => {
    render(
      <ListItem
        item={sampleItem}
        scrollToTop={mockScrollToTop}
        scrollToItem={mockScrollToItem}
      />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should check the item', () => {
    render(
      <ListItem
        item={sampleItem}
        scrollToTop={mockScrollToTop}
        scrollToItem={mockScrollToItem}
      />,
    );
    const radioButtonIcon = screen.getByTestId('RadioButtonIcon');
    fireEvent.press(radioButtonIcon);
    expect(mockChangeCheckedItem).toHaveBeenCalledWith(sampleItem.id);
  });
  it('should delete the item', () => {
    render(
      <ListItem
        item={sampleItem}
        scrollToTop={mockScrollToTop}
        scrollToItem={mockScrollToItem}
      />,
    );
    const radioButtonIcon = screen.getByTestId('TrashIcon');
    fireEvent.press(radioButtonIcon);
    expect(mockDeleteItem).toHaveBeenCalledWith(sampleItem.id);
  });
  it('should go into edit mode', () => {
    render(
      <ListItem
        item={sampleItem}
        scrollToTop={mockScrollToTop}
        scrollToItem={mockScrollToItem}
      />,
    );
    const contentWrapper = screen.getByText(sampleItem.content);
    fireEvent.press(contentWrapper);
    expect(mockScrollToItem).toHaveBeenCalledWith(sampleItem);
    expect(mockGoIntoEditMode).toHaveBeenCalledWith(sampleItem);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should edit the item', async () => {
    const newContent = 'bread and butter';
    render(
      <ListItem
        item={sampleItem}
        scrollToTop={mockScrollToTop}
        scrollToItem={mockScrollToItem}
      />,
    );
    const textInput = screen.getByDisplayValue(sampleItem.content);
    fireEvent.changeText(textInput, newContent);
    fireEvent(textInput, 'blur');
    expect(mockScrollToTop).toHaveBeenCalled();
    expect(mockEditItem).toHaveBeenCalledWith(sampleItem.id, newContent);
  });
  it('should not edit if theres no change', async () => {
    render(
      <ListItem
        item={sampleItem}
        scrollToTop={mockScrollToTop}
        scrollToItem={mockScrollToItem}
      />,
    );
    const textInput = screen.getByDisplayValue(sampleItem.content);
    fireEvent.changeText(textInput, sampleItem.content);
    fireEvent(textInput, 'blur');
    expect(mockEditItem).not.toHaveBeenCalled();
  });
});
