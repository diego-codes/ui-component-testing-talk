import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Center from '../../.storybook/Center';

import { OverflowMenu, MenuItem } from '.';

const stories = storiesOf(OverflowMenu.name, module);
stories.addDecorator(story => <Center>{story()}</Center>);

stories.add('default', () => (
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
));

stories.add('flipped', () => (
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
));

stories.add('with lots of items', () => (
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
));

stories.add('with long toggle text', () => (
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
));
