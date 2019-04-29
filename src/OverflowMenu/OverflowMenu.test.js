import { axe } from 'jest-axe';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { OverflowMenu, OverflowMenuItem } from '.';

describe(OverflowMenu.name, () => {
  describe('Structure', () => {
    it('renders closed', () => {
      const { container } = render(
        <OverflowMenu toggleText="Toggle menu">
          <OverflowMenuItem>Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('renders options when opened', () => {
      const { container, getByTestId } = render(
        <OverflowMenu toggleText="Toggle menu">
          <OverflowMenuItem>Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      fireEvent.click(getByTestId('overflow-menu-toggle'));
      expect(container).toMatchSnapshot();
    });

    it('hides options when toggle button is pressed twice', () => {
      const { container, getByTestId } = render(
        <OverflowMenu toggleText="Toggle menu">
          <OverflowMenuItem>Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      fireEvent.click(getByTestId('overflow-menu-toggle'));
      fireEvent.click(getByTestId('overflow-menu-toggle'));
      expect(container).toMatchSnapshot();
    });

    it('closes menu when user clicks outside of menu', () => {
      const { container, getByTestId } = render(
        <OverflowMenu toggleText="Toggle menu">
          <OverflowMenuItem>Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      fireEvent.click(getByTestId('overflow-menu-toggle'));
      fireEvent.click(document.body);
      expect(container).toMatchSnapshot();
    });

    it('does not close menu when user clicks inside of menu', () => {
      const { container, getByTestId } = render(
        <OverflowMenu toggleText="Toggle menu">
          <OverflowMenuItem data-testid="option">Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      fireEvent.click(getByTestId('overflow-menu-toggle'));
      fireEvent.click(getByTestId('option'));
      expect(container).toMatchSnapshot();
    });

    it('removes click event listener when component unmounts', () => {
      const { unmount } = render(
        <OverflowMenu toggleText="Toggle menu">
          <OverflowMenuItem>Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      const windowRemoveEvenListenerSpy = jest.spyOn(window, 'removeEventListener');
      unmount();
      expect(windowRemoveEvenListenerSpy).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('does not contain accessibility violations by default', async () => {
      const { container } = render(
        <OverflowMenu toggleText="Toggle menu">
          <OverflowMenuItem>Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      const results = await axe(container.innerHTML);
      expect(results).toHaveNoViolations();
    });

    it('does not contain accessibility violations when flipped', async () => {
      const { container } = render(
        <OverflowMenu toggleText="Toggle menu" flipped>
          <OverflowMenuItem>Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      const results = await axe(container.innerHTML);
      expect(results).toHaveNoViolations();
    });

    it('does not contain accessibility violations when open', async () => {
      const { container, getByTestId } = render(
        <OverflowMenu toggleText="Toggle menu">
          <OverflowMenuItem>Option 1</OverflowMenuItem>
          <OverflowMenuItem>Option 2</OverflowMenuItem>
        </OverflowMenu>
      );
      fireEvent.click(getByTestId('overflow-menu-toggle'));
      const results = await axe(container.innerHTML);
      expect(results).toHaveNoViolations();
    });
  });
});
