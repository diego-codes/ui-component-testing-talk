import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

import BusinessCard from '.';

const stories = storiesOf(BusinessCard.name, module);

const eventListeners = actions('onChat', 'onVoiceCall', 'onVideoCall', 'onSMS', 'onEmail');

stories.add('default', () => (
  <BusinessCard
    firstName={text('firstName', 'Squidward')}
    lastName={text('lastName', 'Tentacles')}
    title={text('title', 'Cashier/Clarinet master')}
    business={text('business', 'Krusty Krab')}
    online={boolean('online')}
    email={text('email')}
    phone={text('phone')}
    {...eventListeners}
  />
));
// import 'jest-axe/extend-expect';
// import { axe } from 'jest-axe';

import { render, fireEvent } from 'react-testing-library';
import { BusinessCard } from './BusinessCard';

it('renders chat menu options when contact is online', () => {
  const { container, getByTestId } = render(<BusinessCard {...contact} online />);
  fireEvent.click(getByTestId('overflow-menu-toggle'));
  expect(container).toMatchSnapshot();
});

// it('invokes onChat', () => {
//   const chatMock = jest.fn();
//   const { getByTestId, getByText } = render(<BusinessCard {...contact} online onChat={chatMock} />);
//   fireEvent.click(getByTestId('overflow-menu-toggle'));
//   fireEvent.click(getByText(/chat/i));
//   expect(chatMock).toHaveBeenCalled();
// });

// it('does not contain contact menu by default', () => {
//   const { container } = render(<BusinessCard {...contact} />);
//   const menuButton = queryByText(container, `Contact ${contact.firstName}`);
//   expect(menuButton).toBeNull();
// });

// it('contains contact menu when contact is online', () => {
//   const { getByText } = render(<BusinessCard {...contact} online />);
//   const menuButton = getByText(`Contact ${contact.firstName}`);
//   expect(menuButton).not.toBeNull();
// });

// it('default does not have accessibility violation', async () => {
//   const { container } = render(<BusinessCard {...contact} />);
//   const results = await axe(container.innerHTML);
//   expect(results).toHaveNoViolations();
// });

// <BusinessCard
//   image="./spongebob.jpg"
//   firstName="SpongeBob"
//   lastName="SquarePants"
//   title="Fry cook"
//   business="Krusty Krab"
//   online
//   onChat={() => api.startChat()}
// />;
