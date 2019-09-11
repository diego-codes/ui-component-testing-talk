import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OverflowMenu, MenuItem } from '.';

test('options are not visible by default', () => {
  const { queryByText } = render(
    <OverflowMenu toggleText="Open menu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );

  expect(queryByText(/Option/)).not.toBeInTheDocument();
});

test('options are visible when toggle button is clicked', () => {
  const { getAllByText, getByText } = render(
    <OverflowMenu toggleText="Open menu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );

  fireEvent.click(getByText('Open menu'));
  const options = getAllByText(/Option/);
  expect(options[0]).toHaveTextContent('Option 1');
  expect(options[1]).toHaveTextContent('Option 2');
});

test('options are hidden when toggle button is clicked twice', () => {
  const { queryByText, getByText } = render(
    <OverflowMenu toggleText="Open menu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );

  fireEvent.click(getByText('Open menu'));
  fireEvent.click(getByText('Open menu'));
  expect(queryByText(/Option/)).not.toBeInTheDocument();
});

test('options are hidden when the menu is open and the user clicks outside of it', () => {
  const { queryByText, getByText } = render(
    <OverflowMenu toggleText="Open menu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );

  fireEvent.click(getByText('Open menu'));
  fireEvent.click(document.body);
  expect(queryByText(/Option/)).not.toBeInTheDocument();
});

test('menu options calls on click function when clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(
    <OverflowMenu toggleText="Open menu">
      <MenuItem onClick={onClickMock}>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );

  fireEvent.click(getByText('Open menu'));
  fireEvent.click(getByText('Option 1'));
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('options are hidden when the user makes a selection', () => {
  const { getByText } = render(
    <OverflowMenu toggleText="Open menu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );

  fireEvent.click(getByText('Open menu'));
  const option1 = getByText('Option 1');
  fireEvent.click(option1);
  expect(option1).not.toBeInTheDocument();
});
