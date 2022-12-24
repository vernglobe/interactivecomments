import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders interactive comments', () => {
  render(<App />);
  const sendButton = screen.getByText(/send/i);
  expect(sendButton).toBeInTheDocument();
});
