import React from 'react';
import {
  render,
  queryByText,
  queryByTestId,
  queryAllByText,
  fireEvent,
} from '@testing-library/react';
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

test('renders', () =>
  expect(() =>
    render(
      <ContactCard
        firstName={contact.firstName}
        lastName={contact.lastName}
        title={contact.title}
        business={contact.business}
      />
    )
  ).not.toThrow());

test('contains full name', () => {
  const { container } = render(<ContactCard {...contact} />);
  expect(container).toHaveTextContent(`${contact.firstName} ${contact.lastName}`);
});

test('displays headshot', () => {
  const { getByTestId } = render(<ContactCard {...contact} image={image} />);
  const headShot = getByTestId('business-card-image');
  expect(headShot).not.toBeNull();
});

test('doesn not display headshot if image is not provided', () => {
  const { container } = render(<ContactCard {...contact} />);
  const headShot = queryByTestId(container, 'business-card-image');
  expect(headShot).toBeNull();
});

test('does not contain contact menu by default', () => {
  const { container } = render(<ContactCard {...contact} />);
  const menuButton = queryByText(container, `Contact ${contact.firstName}`);
  expect(menuButton).toBeNull();
});

test('contains contact menu when contact is online', () => {
  const { getByText } = render(<ContactCard {...contact} online />);
  const menuButton = getByText(`Contact ${contact.firstName}`);
  expect(menuButton).not.toBeNull();
});

test('shows that contact is offline by default', () => {
  const { getByTestId } = render(<ContactCard {...contact} />);
  expect(getByTestId('business-card-online-indicator')).toHaveTextContent(/offline/i);
});

test('shows that contact is online', () => {
  const { getByTestId } = render(<ContactCard {...contact} online />);
  expect(getByTestId('business-card-online-indicator')).toHaveTextContent(/online/i);
});

test('contains contact menu when phone number is provided', () => {
  const { getByTestId } = render(<ContactCard {...contact} phone={phone} />);
  const menuButton = getByTestId('overflow-menu');
  expect(menuButton).not.toBeNull();
});

test('contains contact menu when email is provided', () => {
  const { getByTestId } = render(<ContactCard {...contact} email={email} />);
  const menuButton = getByTestId('overflow-menu');
  expect(menuButton).not.toBeNull();
});

test('contains online menu options when contact is online', () => {
  const { getByTestId } = render(<ContactCard {...contact} online />);
  const overflowMenu = getByTestId('overflow-menu');
  const overflowMenuToggleButton = getByTestId('overflow-toggle');
  fireEvent.click(overflowMenuToggleButton);
  const options = queryAllByText(overflowMenu, /chat/i);
  expect(options).toHaveLength(1);
});

test('contains phone menu options when phone number is provided', () => {
  const { getByTestId } = render(<ContactCard {...contact} phone={phone} />);
  const overflowMenu = getByTestId('overflow-menu');
  const overflowMenuToggleButton = getByTestId('overflow-toggle');
  fireEvent.click(overflowMenuToggleButton);
  const options = queryAllByText(overflowMenu, /call|sms/i);
  expect(options).toHaveLength(3);
});

test('contains email menu options when email is provided', () => {
  const { getByTestId } = render(<ContactCard {...contact} email={email} />);
  const overflowMenu = getByTestId('overflow-menu');
  const overflowMenuToggleButton = getByTestId('overflow-toggle');
  fireEvent.click(overflowMenuToggleButton);
  const options = queryAllByText(overflowMenu, /email/i);
  expect(options).toHaveLength(1);
});

test('invokes onChat', () => {
  const chatMock = jest.fn();
  const { getByTestId, getByText } = render(<ContactCard {...contact} online onChat={chatMock} />);
  fireEvent.click(getByTestId('overflow-toggle'));
  fireEvent.click(getByText(/chat/i));
  expect(chatMock).toHaveBeenCalled();
});

test('invokes onVoiceCall', () => {
  const voiceCallMock = jest.fn();
  const { getByTestId, getByText } = render(
    <ContactCard {...contact} phone={phone} onVoiceCall={voiceCallMock} />
  );
  fireEvent.click(getByTestId('overflow-toggle'));
  fireEvent.click(getByText(/voice call/i));
  expect(voiceCallMock).toHaveBeenCalled();
});

test('invokes onVideoCall', () => {
  const videoCallMock = jest.fn();
  const { getByTestId, getByText } = render(
    <ContactCard {...contact} phone={phone} onVideoCall={videoCallMock} />
  );
  fireEvent.click(getByTestId('overflow-toggle'));
  fireEvent.click(getByText(/video call/i));
  expect(videoCallMock).toHaveBeenCalledTimes(1);
});

test('invokes onSMS', () => {
  const sendSMSMock = jest.fn();
  const { getByTestId, getByText } = render(
    <ContactCard {...contact} phone={phone} onSMS={sendSMSMock} />
  );
  fireEvent.click(getByTestId('overflow-toggle'));
  fireEvent.click(getByText(/SMS/i));
  expect(sendSMSMock).toHaveBeenCalledTimes(1);
});

test('invokes onEmail', () => {
  const sendEmail = jest.fn();
  const { getByTestId, getByText } = render(
    <ContactCard {...contact} email={email} onEmail={sendEmail} />
  );
  fireEvent.click(getByTestId('overflow-toggle'));
  fireEvent.click(getByText(/email/i));
  expect(sendEmail).toHaveBeenCalledTimes(1);
});
