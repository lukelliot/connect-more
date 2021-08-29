import { render, screen } from '@testing-library/react';
import ConnectMore from './ConnectMore';

test('renders learn react link', () => {
  render(<ConnectMore />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
