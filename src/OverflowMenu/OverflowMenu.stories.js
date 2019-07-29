import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { OverflowMenu, MenuItem } from '.';

const Center = styled.div`
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const stories = storiesOf('OverflowMenu', module);
stories.addDecorator(story => <Center>{story()}</Center>);

stories.add('default', () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Open menu')}
    compact={boolean('compact')}
    flipped={boolean('flipped')}
    onOpen={action('onOpen')}
    onClose={action('onClose')}
  >
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  </OverflowMenu>
));

stories.add('compact', () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Open menu')}
    compact={boolean('compact', true)}
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
    compact={boolean('compact')}
    flipped={boolean('flipped', true)}
    onOpen={action('onOpen')}
    onClose={action('onClose')}
  >
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  </OverflowMenu>
));
