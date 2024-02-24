import { fireEvent, render, screen } from '@testing-library/react-native';

import ListItem from '../ListItem';

const mockChangeCheckedItem = jest.fn();
const mockDeleteItem = jest.fn();
const mockEditItem = jest.fn();
const mockMainContextReturnValue = {
  changeCheckedItem: mockChangeCheckedItem,
  deleteItem: mockDeleteItem,
  editItem: mockEditItem,
};
const mockSearchContextReturnValue = {
  isSearching: false,
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
    .mockImplementationOnce(() => mockMainContextReturnValue)
    .mockImplementationOnce(() => mockSearchContextReturnValue)
    .mockImplementationOnce(() => mockMainContextReturnValue)
    .mockImplementationOnce(() => mockSearchContextReturnValue),
}));
beforeEach(() => {
  jest.clearAllMocks();
});
describe('ListItem', () => {
  it('should match snapshot unchecked', () => {
    const item = {
      id: '1',
      checked: false,
      content: 'bread',
      updatedAt: 1631067373,
    };
    render(<ListItem item={item} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should match snapshot checked', () => {
    const item = {
      id: '1',
      checked: true,
      content: 'bread',
      updatedAt: 1631067373,
    };
    render(<ListItem item={item} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should match snapshot in searching state', () => {
    const item = {
      id: '1',
      checked: true,
      content: 'bread',
      updatedAt: 1631067373,
    };

    render(<ListItem item={item} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should check the item', () => {
    const item = {
      id: '1',
      checked: false,
      content: 'bread',
      updatedAt: 1631067373,
    };
    render(<ListItem item={item} />);
    const radioButtonIcon = screen.getByTestId('RadioButtonIcon');
    fireEvent.press(radioButtonIcon);
    expect(mockChangeCheckedItem).toHaveBeenCalledWith(item.id);
  });
  it('should delete the item', () => {
    const item = {
      id: '1',
      checked: false,
      content: 'bread',
      updatedAt: 1631067373,
    };
    render(<ListItem item={item} />);
    const radioButtonIcon = screen.getByTestId('TrashIcon');
    fireEvent.press(radioButtonIcon);
    expect(mockDeleteItem).toHaveBeenCalledWith(item.id);
  });
  it('should edit the item', () => {
    const item = {
      id: '1',
      checked: false,
      content: 'bread',
      updatedAt: 1631067373,
    };
    render(<ListItem item={item} />);
    const textInput = screen.getByDisplayValue('bread');
    fireEvent.changeText(textInput, 'bread and butter');
    fireEvent(textInput, 'blur');
    expect(mockEditItem).toHaveBeenCalledWith(item.id, 'bread and butter');
  });
  it('should edit with same value', () => {
    const item = {
      id: '1',
      checked: false,
      content: 'bread',
      updatedAt: 1631067373,
    };
    render(<ListItem item={item} />);
    const textInput = screen.getByDisplayValue('bread');
    fireEvent.changeText(textInput, 'bread');
    fireEvent(textInput, 'blur');
    expect(mockEditItem).not.toHaveBeenCalled();
  });
});
