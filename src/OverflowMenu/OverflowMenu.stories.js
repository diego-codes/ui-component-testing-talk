import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { OverflowMenu, MenuItem } from '.';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const stories = storiesOf('OverflowMenu', module);
stories.addDecorator(story => <Center>{story()}</Center>);

stories.add('default', () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Contact friend')}
    compact={boolean('compact')}
    flipped={boolean('flipped')}
  >
    <MenuItem>Call friend</MenuItem>
    <MenuItem>SMS friend</MenuItem>
    <MenuItem>Email friend</MenuItem>
  </OverflowMenu>
));

stories.add('compact', () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Contact friend')}
    compact={boolean('compact', true)}
    flipped={boolean('flipped')}
  >
    <MenuItem>Call friend</MenuItem>
    <MenuItem>SMS friend</MenuItem>
    <MenuItem>Email friend</MenuItem>
  </OverflowMenu>
));

stories.add('flipped', () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Contact friend')}
    compact={boolean('compact')}
    flipped={boolean('flipped', true)}
  >
    <MenuItem>Call friend</MenuItem>
    <MenuItem>SMS friend</MenuItem>
    <MenuItem>Email friend</MenuItem>
  </OverflowMenu>
));
