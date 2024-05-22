import { render as _render, screen } from './test/utilities';
import { PackingList } from '.';
import { createStore } from './store';
import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';

const render: typeof _render = (Component, options) => {
  
  const store = createStore();
  
  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>
  };
  return _render(Component, {...options, wrapper: Wrapper})
}

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />)
  screen.getByLabelText('New Item Name')
  
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />)
  const newItemInput = screen.getByLabelText('New Item Name')
  const newAddButton = screen.getByRole('button', { name: /Add new Item/i })
  
  expect(newItemInput).toHaveValue('');
  expect(newAddButton).toBeDisabled();
},
);

it(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
    const { user } = render(<PackingList />)

    const newInputItem = screen.getByLabelText<HTMLInputElement>('New Item Name')
    const newAddButton = screen.getByRole('button', { name: /Add new Item/i })
    expect(newAddButton).toBeDisabled()
    
    await user.type(newInputItem, 'A new item')
    expect(newAddButton).toBeEnabled()
    expect(newInputItem.value).toEqual('A new item')
  },
);

it(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
    const { user } = render(<PackingList />)
    const newInputItem = screen.getByLabelText<HTMLInputElement>('New Item Name')
    const newAddButton = screen.getByRole<HTMLButtonElement>('button', { name: /Add new Item/i })
    
    await user.type(newInputItem, 'A new item')
    await user.click(newAddButton)
    
    expect(screen.getByLabelText('A new item')).not.toBeChecked();

  },
);