import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { OverflowMenu, OverflowMenuItem } from '.';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const stories = storiesOf(OverflowMenu.name, module);
stories.addDecorator(story => <Center>{story()}</Center>);

stories.add('default', () => (
  <OverflowMenu toggleText={text('toggleText', 'Contact friend')} flipped={boolean('flipped')}>
    <OverflowMenuItem>Call friend</OverflowMenuItem>
    <OverflowMenuItem>SMS friend</OverflowMenuItem>
    <OverflowMenuItem>Email friend</OverflowMenuItem>
  </OverflowMenu>
));

stories.add('flipped', () => (
  <OverflowMenu
    toggleText={text('toggleText', 'Contact friend')}
    flipped={boolean('flipped', true)}
  >
    <OverflowMenuItem>Call friend</OverflowMenuItem>
    <OverflowMenuItem>SMS friend</OverflowMenuItem>
    <OverflowMenuItem>Email friend</OverflowMenuItem>
  </OverflowMenu>
));
