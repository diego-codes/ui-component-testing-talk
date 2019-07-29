import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import ContactsList from '.';
import ContactCard from '../ContactCard';

const stories = storiesOf('ContactsList', module);

stories.add('default', () => (
  <ContactsList title={text('title', 'My friends')}>
    <ContactCard
      firstName="Squidward"
      lastName="Tentacles"
      title="Cashier/Clarinet master"
      business="Krusty Krab"
    />
    <ContactCard
      image="https://pbs.twimg.com/profile_images/439113071902998528/H3CCnV1C.jpeg"
      firstName="Eugene"
      lastName="Krabs"
      title="Restauranteur"
      business="Krusty Krab"
      online
    />
    <ContactCard
      image="http://en.spongepedia.org/images/thumb/5/55/SpongeBob_SquarePants_Sheldon_Plankton.jpg/250px-SpongeBob_SquarePants_Sheldon_Plankton.jpg"
      firstName="Sheldon"
      lastName="Plankton"
      title="Evil genius"
      business="Chum Bucket"
      online
      phone="555-555-5555"
    />

    <ContactCard
      image="https://pbs.twimg.com/profile_images/532352938392293376/15Zj9aOq_400x400.png"
      firstName="Sandy"
      lastName="Cheeks"
      title="Scientist"
      business="Independent"
      online
      email="sandy.cheeks@scientist.sea"
    />

    <ContactCard
      image="https://pbs.twimg.com/profile_images/1856175966/Spongebob_400x400.jpg"
      firstName="SpongeBob"
      lastName="SquarePants"
      title="Fry cook"
      business="Krusty Krab"
      online
      email="s.sqarepants@krabby.com"
      phone="555-555-5555"
    />
  </ContactsList>
));
