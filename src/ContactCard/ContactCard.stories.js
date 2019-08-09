import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import Center from '../../.storybook/Center';

import ContactCard from '.';

const stories = storiesOf('ContactCard', module);
stories.addDecorator(story => (
  <Center>
    <div style={{ width: '32em' }}>{story()}</div>
  </Center>
));

const eventListeners = actions('onChat', 'onVoiceCall', 'onVideoCall', 'onSMS', 'onEmail');

stories.add('default', () => (
  <ContactCard
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
));

stories.add('online', () => (
  <ContactCard
    image="https://pbs.twimg.com/profile_images/439113071902998528/H3CCnV1C.jpeg"
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
));

stories.add('with phone number', () => (
  <ContactCard
    image="http://en.spongepedia.org/images/thumb/5/55/SpongeBob_SquarePants_Sheldon_Plankton.jpg/250px-SpongeBob_SquarePants_Sheldon_Plankton.jpg"
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
));

stories.add('with email', () => (
  <ContactCard
    image="https://pbs.twimg.com/profile_images/532352938392293376/15Zj9aOq_400x400.png"
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
));

stories.add('online with all contact info', () => (
  <ContactCard
    image="https://pbs.twimg.com/profile_images/1856175966/Spongebob_400x400.jpg"
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
));

stories.add('loading', () => <ContactCard loading={boolean('loading', true)} />);
