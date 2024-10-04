import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to GP-Vote/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders email input field', () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/g.com/i);
  expect(emailInput).toBeInTheDocument();
});

test('renders password input field', () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText(/••••••••/i);
  expect(passwordInput).toBeInTheDocument();
});

test('renders login button', () => {
  render(<App />);
  const loginButton = screen.getByRole('button', { name: /log in/i });
  expect(loginButton).toBeInTheDocument();
});





test('allows user to type in email input field', () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/g.com/i);
  fireEvent.change(emailInput, { target: { value: 'test@g.com' } });
  expect(emailInput.value).toBe('test@g.com');
});

test('allows user to type in password input field', () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText(/••••••••/i);
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  expect(passwordInput.value).toBe('password123');
});



test('enables login button when inputs are filled', () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/g.com/i);
  const passwordInput = screen.getByPlaceholderText(/••••••••/i);
  const loginButton = screen.getByRole('button', { name: /log in/i });

  fireEvent.change(emailInput, { target: { value: 'test@g.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(loginButton).toBeEnabled();
});
