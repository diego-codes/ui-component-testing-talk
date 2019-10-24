import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Center from '../../.storybook/Center';

import { OverflowMenu, MenuItem } from '.';

const CenterDecorator = story => <Center>{story()}</Center>;
export default {
  component: OverflowMenu,
  title: 'OverflowMenu',
  decorators: [CenterDecorator],
};

export const base = () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Open menu')}
    flipped={boolean('flipped')}
    onOpen={action('onOpen')}
    onClose={action('onClose')}
  >
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  </OverflowMenu>
);

export const flipped = () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Open menu')}
    flipped={boolean('flipped', true)}
    onOpen={action('onOpen')}
    onClose={action('onClose')}
  >
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  </OverflowMenu>
);

export const withLotsOfItems = () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Open menu')}
    flipped={boolean('flipped')}
    onOpen={action('onOpen')}
    onClose={action('onClose')}
  >
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
    <MenuItem>Option 4</MenuItem>
    <MenuItem>Option 5</MenuItem>
    <MenuItem>Option 6</MenuItem>
  </OverflowMenu>
);

export const withLongToggleText = () => (
  <OverflowMenu
    toggleText={text('toggleText', 'This is a long label that should be truncated')}
    flipped={boolean('flipped')}
    onOpen={action('onOpen')}
    onClose={action('onClose')}
  >
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  </OverflowMenu>
);
