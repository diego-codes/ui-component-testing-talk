import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactCard from '.';

const contact = {
  firstName: 'SpongeBob',
  lastName: 'SquarePants',
  title: 'Fry cook',
  business: 'Krusty Krab',
};

const image = 'spongebob.jpg';
const email = 's.squarepants@krabby.com';
const phone = '555-555-5555';

test('contains full name', () => {
  const { container } = render(<ContactCard {...contact} />);
  expect(container).toHaveTextContent(`${contact.firstName} ${contact.lastName}`);
});

test('doesn not display headshot if image is not provided', () => {
  const { queryByLabelText } = render(<ContactCard {...contact} />);
  expect(queryByLabelText(`Avatar image of ${contact.firstName}`)).not.toBeInTheDocument();
});

test('displays avatar when provided', () => {
  const { getByLabelText } = render(<ContactCard {...contact} image={image} />);
  const avatar = getByLabelText(`Avatar image of ${contact.firstName}`);
  expect(avatar).toBeVisible();
  expect(avatar).toHaveStyle(`background-image: url(${image})`);
});

test('does not contain contact menu by default', () => {
  const { queryByText } = render(<ContactCard {...contact} />);
  expect(queryByText(/contact/i)).not.toBeInTheDocument();
});

test('shows that contact is offline by default', () => {
  const { getByText } = render(<ContactCard {...contact} />);
  expect(getByText('Offline')).toBeVisible();
});

test('shows that contact is online', () => {
  const { getByText } = render(<ContactCard {...contact} online />);
  expect(getByText('Online')).toBeVisible();
});

test('user can start chat when user is online', () => {
  const onChatMock = jest.fn();
  const { getByText } = render(<ContactCard {...contact} online onChat={onChatMock} />);
  fireEvent.click(getByText(/contact/i));
  fireEvent.click(getByText('Start chat'));
  expect(onChatMock).toHaveBeenCalledTimes(1);
});

test('user can start a voice call when phone number is provided', () => {
  const onVoiceCallMock = jest.fn();
  const { getByText } = render(
    <ContactCard {...contact} phone={phone} onVoiceCall={onVoiceCallMock} />
  );
  fireEvent.click(getByText(/contact/i));
  fireEvent.click(getByText('Start voice call'));
  expect(onVoiceCallMock).toHaveBeenCalledTimes(1);
});

test('user can start a video call when phone number is provided', () => {
  const onVideoCallMock = jest.fn();
  const { getByText } = render(
    <ContactCard {...contact} phone={phone} onVideoCall={onVideoCallMock} />
  );
  fireEvent.click(getByText(/contact/i));
  fireEvent.click(getByText('Start video call'));
  expect(onVideoCallMock).toHaveBeenCalledTimes(1);
});

test('user can send an SMS message when phone number is provided', () => {
  const onSMSMock = jest.fn();
  const { getByText } = render(<ContactCard {...contact} phone={phone} onSMS={onSMSMock} />);
  fireEvent.click(getByText(/contact/i));
  fireEvent.click(getByText('Send SMS'));
  expect(onSMSMock).toHaveBeenCalledTimes(1);
});

test('user can send an email message when email address is provided', () => {
  const onEmailMock = jest.fn();
  const { getByText } = render(<ContactCard {...contact} email={email} onEmail={onEmailMock} />);
  fireEvent.click(getByText(/contact/i));
  fireEvent.click(getByText('Send email'));
  expect(onEmailMock).toHaveBeenCalledTimes(1);
});

test('contact card is clear when loading', () => {
  const { container } = render(<ContactCard {...contact} loading />);
  expect(container).toHaveTextContent('');
});
