import { fireEvent, render, screen } from '@testing-library/react-native';
import { useContext } from 'react';

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

const mockScrollToItem = jest.fn();

const sampleItem = {
  id: '1631067373',
  checked: false,
  content: 'bread',
  updatedAt: 1631067373,
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});
describe('ListItem', () => {
  it('should match snapshot unchecked', () => {
    (useContext as jest.MockedFunction<typeof useContext>)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => mockSearchContextReturnValue);
    render(<ListItem item={sampleItem} scrollToItem={mockScrollToItem} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot checked', () => {
    (useContext as jest.MockedFunction<typeof useContext>)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => mockSearchContextReturnValue);
    render(
      <ListItem
        item={{ ...sampleItem, checked: true }}
        scrollToItem={mockScrollToItem}
      />,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should match snapshot in searching state', () => {
    (useContext as jest.MockedFunction<typeof useContext>)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => ({
        ...mockSearchContextReturnValue,
        isSearching: true,
      }));
    render(<ListItem item={sampleItem} scrollToItem={mockScrollToItem} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should check the item', () => {
    (useContext as jest.MockedFunction<typeof useContext>)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => mockSearchContextReturnValue)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => mockSearchContextReturnValue);
    const { rerender } = render(
      <ListItem item={sampleItem} scrollToItem={mockScrollToItem} />,
    );
    const radioButtonIcon = screen.getByTestId('RadioButtonIcon');
    fireEvent.press(radioButtonIcon);
    expect(mockChangeCheckedItem).toHaveBeenCalledWith(sampleItem.id);
    const updatedItem = { ...sampleItem, updatedAt: 1631067374, checked: true };
    rerender(<ListItem item={updatedItem} scrollToItem={mockScrollToItem} />);
    expect(mockScrollToItem).toHaveBeenCalledWith(updatedItem);
  });
  it('should uncheck the item', () => {
    (useContext as jest.MockedFunction<typeof useContext>)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => mockSearchContextReturnValue)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => mockSearchContextReturnValue);
    const { rerender } = render(
      <ListItem
        item={{ ...sampleItem, checked: true }}
        scrollToItem={mockScrollToItem}
      />,
    );
    const checkButtonIcon = screen.getByTestId('CheckIcon');
    fireEvent.press(checkButtonIcon);
    expect(mockChangeCheckedItem).toHaveBeenCalledWith(sampleItem.id);
    const updatedItem = {
      ...sampleItem,
      updatedAt: 1631067374,
      checked: false,
    };
    rerender(<ListItem item={updatedItem} scrollToItem={mockScrollToItem} />);
    expect(mockScrollToItem).toHaveBeenCalledWith(updatedItem);
  });
  it('should delete the item', () => {
    (useContext as jest.MockedFunction<typeof useContext>)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => mockSearchContextReturnValue);
    render(<ListItem item={sampleItem} scrollToItem={mockScrollToItem} />);
    const radioButtonIcon = screen.getByTestId('TrashIcon');
    fireEvent.press(radioButtonIcon);
    expect(mockDeleteItem).toHaveBeenCalledWith(sampleItem.id);
  });
  it('should go into edit mode', () => {
    (useContext as jest.MockedFunction<typeof useContext>)
      .mockImplementationOnce(() => mockMainContextReturnValue)
      .mockImplementationOnce(() => mockSearchContextReturnValue);
    render(<ListItem item={sampleItem} scrollToItem={mockScrollToItem} />);
    const contentWrapper = screen.getByText(sampleItem.content);
    fireEvent.press(contentWrapper);
    expect(mockGoIntoEditMode).toHaveBeenCalledWith(sampleItem);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should edit an item', async () => {
    (useContext as jest.MockedFunction<typeof useContext>)
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
      .mockImplementationOnce(() => mockSearchContextReturnValue);

    const newContent = 'bread and butter';
    render(<ListItem item={sampleItem} scrollToItem={mockScrollToItem} />);
    const textInput = screen.getByDisplayValue(sampleItem.content);
    fireEvent.changeText(textInput, newContent);
    fireEvent(textInput, 'blur');
    expect(mockEditItem).toHaveBeenCalledWith(sampleItem.id, newContent);
    expect(mockGetOutOfEditMode).toHaveBeenCalled();
    expect(mockScrollToItem).toHaveBeenCalledWith(sampleItem);
  });
  it('should edit a checked item', async () => {
    (useContext as jest.MockedFunction<typeof useContext>)
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
      .mockImplementationOnce(() => mockSearchContextReturnValue);
    const newContent = 'bread and butter';
    render(
      <ListItem
        item={{ ...sampleItem, checked: true }}
        scrollToItem={mockScrollToItem}
      />,
    );
    const textInput = screen.getByDisplayValue(sampleItem.content);
    fireEvent.changeText(textInput, newContent);
    fireEvent(textInput, 'blur');
    expect(mockEditItem).toHaveBeenCalledWith(sampleItem.id, newContent);
    expect(mockGetOutOfEditMode).toHaveBeenCalled();
    expect(mockScrollToItem).toHaveBeenCalledWith({
      ...sampleItem,
      checked: true,
    });
  });
});
