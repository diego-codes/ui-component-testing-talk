import React from 'react';
import { actions } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import Center from '../../.storybook/Center';

import ContactCard from '.';

const CenterDecorator = story => (
  <Center>
    <div style={{ width: '32em' }}>{story()}</div>
  </Center>
);

export default {
  component: ContactCard,
  title: 'ContactCard',
  decorators: [CenterDecorator],
};

const eventListeners = actions('onChat', 'onVoiceCall', 'onVideoCall', 'onSMS', 'onEmail');

export const base = () => (
  <ContactCard
    image="/squidward.png"
    firstName={text('firstName', 'Squidward')}
    lastName={text('lastName', 'Tentacles')}
    title={text('title', 'Cashier/Clarinet master')}
    business={text('business', 'Krusty Krab')}
    online={boolean('online')}
    email={text('email')}
    phone={text('phone')}
    loading={boolean('loading')}
    {...eventListeners}
  />
);

export const online = () => (
  <ContactCard
    image="/krabs.png"
    firstName={text('firstName', 'Eugene')}
    lastName={text('lastName', 'Krabs')}
    title={text('title', 'Restauranteur')}
    business={text('business', 'Krusty Krab')}
    online={boolean('online', true)}
    email={text('email')}
    phone={text('phone')}
    loading={boolean('loading')}
    {...eventListeners}
  />
);

export const withPhoneNumber = () => (
  <ContactCard
    image="/plankton.png"
    firstName={text('firstName', 'Sheldon')}
    lastName={text('lastName', 'Plankton')}
    title={text('title', 'Evil genius')}
    business={text('business', 'Chum Bucket')}
    online={boolean('online')}
    email={text('email')}
    phone={text('phone', '555-555-5555')}
    loading={boolean('loading')}
    {...eventListeners}
  />
);

export const withEmail = () => (
  <ContactCard
    image="/sandy.png"
    firstName={text('firstName', 'Sandy')}
    lastName={text('lastName', 'Cheeks')}
    title={text('title', 'Scientist')}
    business={text('business', 'Independent')}
    online={boolean('online')}
    email={text('email', 'sandy.cheeks@scientist.sea')}
    phone={text('phone')}
    loading={boolean('loading')}
    {...eventListeners}
  />
);

export const onlineWithAllContactInfo = () => (
  <ContactCard
    image="/spongebob.png"
    firstName={text('firstName', 'SpongeBob')}
    lastName={text('lastName', 'SquarePants')}
    title={text('title', 'Fry cook')}
    business={text('business', 'Krusty Krab')}
    online={boolean('online', true)}
    email={text('email', 's.sqarepants@krabby.com')}
    phone={text('phone', '555-555-5555')}
    loading={boolean('loading')}
    {...eventListeners}
  />
);

export const loading = () => <ContactCard loading={boolean('loading', true)} />;
