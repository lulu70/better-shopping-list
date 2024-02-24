import { render, screen } from '@testing-library/react-native';

import Main from '../Main';

jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  return {
    ...actual,
    useSafeAreaInsets: () => ({ bottom: 0 }),
  };
});

describe('Main', () => {
  it('should match snapshot', () => {
    render(<Main />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
