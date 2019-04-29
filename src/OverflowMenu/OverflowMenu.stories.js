import React from 'react';
import { storiesOf } from '@storybook/react';
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
  <OverflowMenu toggleText="Contact friend">
    <OverflowMenuItem>Call friend</OverflowMenuItem>
    <OverflowMenuItem>SMS friend</OverflowMenuItem>
    <OverflowMenuItem>Email friend</OverflowMenuItem>
  </OverflowMenu>
));

stories.add('flipped', () => (
  <OverflowMenu toggleText="Contact friend" flipped>
    <OverflowMenuItem>Call friend</OverflowMenuItem>
    <OverflowMenuItem>SMS friend</OverflowMenuItem>
    <OverflowMenuItem>Email friend</OverflowMenuItem>
  </OverflowMenu>
));
