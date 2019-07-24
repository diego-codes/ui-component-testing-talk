import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OverflowMenu, MenuItem } from '.';

test('toggle button has toggle text', () => {
  const { getByTestId } = render(
    <OverflowMenu toggleText="Toggle menu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );
  const toggleButton = getByTestId('overflow-toggle');
  expect(toggleButton).toHaveTextContent('Toggle menu');
});

test('toggle button has compact icon', () => {
  const { getByTestId } = render(
    <OverflowMenu toggleText="Toggle menu" compact>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );
  const toggleIcon = getByTestId('overflow-toggle-icon');
  expect(toggleIcon).not.toBeNull();
});

test('toggle menu is flipped', () => {
  const { getByTestId } = render(
    <OverflowMenu toggleText="Toggle menu" flipped open>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );
  const toggleIcon = getByTestId('overflow-menu');
  expect(toggleIcon).toHaveStyle('right: 0; left: unset');
});
test('shows items when user clicks on toggle', () => {
  const { getByText } = render(
    <OverflowMenu toggleText="Toggle menu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );
  fireEvent.click(getByText('Toggle menu'));
  expect(getByText('Option 1')).toBeVisible();
});

test('calls onOpen when user opens menu', () => {
  const onOpenMock = jest.fn();
  const { getByText } = render(
    <OverflowMenu toggleText="Toggle menu" onOpen={onOpenMock}>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );

  fireEvent.click(getByText('Toggle menu'));
  expect(onOpenMock).toHaveBeenCalledTimes(1);
});

test('calls onClose when user clicks outside menu', () => {
  const onCloseMock = jest.fn();
  const { getByText } = render(
    <OverflowMenu toggleText="Toggle menu" onClose={onCloseMock}>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );

  fireEvent.click(getByText('Toggle menu'));
  fireEvent.click(document.body);
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test('removes click event listener when component unmounts', () => {
  const removeListenerSpy = jest.spyOn(document, 'removeEventListener');
  const { unmount } = render(
    <OverflowMenu toggleText="Toggle menu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </OverflowMenu>
  );
  unmount();
  expect(removeListenerSpy).toHaveBeenCalledTimes(1);
});
