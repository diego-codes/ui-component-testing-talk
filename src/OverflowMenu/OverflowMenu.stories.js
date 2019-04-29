import React from 'react';
import { storiesOf } from '@storybook/react';

import { OverflowMenu, OverflowMenuItem } from '.';

const stories = storiesOf(OverflowMenu.name, module);

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
