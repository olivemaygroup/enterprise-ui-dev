// @vitest-environment happy-dom
// import { screen } from '@testing-library/react';
import { render, screen } from 'test/utilities';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  
  await user.click(incrementButton);
  
  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={400} />);
  screen.debug(document.body)
  const initialCount = screen.getByTestId('current-count');
  expect(initialCount).toHaveTextContent('400');
  
});

const renderCounter = (initialCount: number) => {
  const { user }  = render(<Counter initialCount={initialCount}/>)
  const currentCount = screen.getByTestId('current-count')
  const incrementButton = screen.getByRole('button', {name: /increment/i})
  const resetButton = screen.getByRole('button', {name: /reset/i})
  return { user, currentCount, incrementButton, resetButton}
} 

test(
  'it should reset the count when the "Reset" button is pressed',
  async () => {
    const counter = renderCounter(60)
    counter.user.click(counter.resetButton)


    // const { user }  = render(<Counter initialCount={400}/>)
    // const currentCount = screen.getByTestId('current-count')
    // await user.click(screen.getByRole('button', { name: /reset/i }))
    expect(counter.currentCount).toHaveTextContent('0')
  },
);
