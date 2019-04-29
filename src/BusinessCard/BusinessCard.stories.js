import React from 'react';
import { storiesOf } from '@storybook/react';

import BusinessCard from '.';

const stories = storiesOf(BusinessCard.name, module);

stories.add('default', () => (
  <BusinessCard
    firstName="Squidward"
    lastName="Tentacles"
    title="Cashier &amp; Clarinet master"
    business="Krusty Krab"
  />
));

stories.add('online', () => (
  <BusinessCard
    image="https://pbs.twimg.com/profile_images/439113071902998528/H3CCnV1C.jpeg"
    firstName="Eugene"
    lastName="Krabs"
    title="Restauranteur"
    business="Krusty Krab"
    online
  />
));

stories.add('online with phone number', () => (
  <BusinessCard
    image="http://en.spongepedia.org/images/thumb/5/55/SpongeBob_SquarePants_Sheldon_Plankton.jpg/250px-SpongeBob_SquarePants_Sheldon_Plankton.jpg"
    firstName="Sheldon"
    lastName="Plankton"
    title="Evil genius"
    business="Chum Bucket"
    phone="555-555-5555"
    online
  />
));

stories.add('offline with email', () => (
  <BusinessCard
    image="https://pbs.twimg.com/profile_images/532352938392293376/15Zj9aOq_400x400.png"
    firstName="Sandy"
    lastName="Cheeks"
    title="Scientist"
    business="Independent"
    email="sandy.cheeks@scientist.sea"
  />
));

stories.add('online with contact info', () => (
  <BusinessCard
    image="https://pbs.twimg.com/profile_images/1856175966/Spongebob_400x400.jpg"
    firstName="SpongeBob"
    lastName="SquarePants"
    title="Fry cook"
    business="Krusty Krab"
    email="s.sqarepants@krabby.com"
    phone="555-555-5555"
  />
));
