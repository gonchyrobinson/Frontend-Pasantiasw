import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders login heading and button', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /bienvenido/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /iniciar sesión/i })
  ).toBeInTheDocument();
});
