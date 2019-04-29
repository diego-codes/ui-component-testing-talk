import React from 'react';
import { render, queryByTestId, queryAllByText } from 'react-testing-library';
import BusinessCard from '.';

const contact = {
  firstName: 'SpongeBob',
  lastName: 'SquarePants',
  title: 'Fry cook',
  business: 'Krusty Krab',
};

const image = 'spongebob.jpg';
const email = 's.squarepants@krabby.com';
const phone = '555-555-5555';

describe(BusinessCard.name, () => {
  describe('structure - detailed', () => {
    it('renders', () =>
      expect(() =>
        render(
          <BusinessCard
            firstName={contact.firstName}
            lastName={contact.lastName}
            title={contact.title}
            business={contact.business}
          />
        )
      ).not.toThrow());

    it('contains full name', () => {
      const { container } = render(<BusinessCard {...contact} />);
      expect(container).toHaveTextContent(`${contact.firstName} ${contact.lastName}`);
    });

    it('displays headshot', () => {
      const { getByTestId } = render(<BusinessCard {...contact} image={image} />);
      const headShot = getByTestId('business-card-image');
      expect(headShot).not.toBeNull();
    });

    it('doesn not display headshot if image is not provided', () => {
      const { container } = render(<BusinessCard {...contact} />);
      const headShot = queryByTestId(container, 'business-card-image');
      expect(headShot).toBeNull();
    });

    it('does not contain contact menu when contact info is not provided', () => {
      const { container } = render(<BusinessCard {...contact} />);
      const menuButton = queryByTestId(container, 'overflow-menu');
      expect(menuButton).toBeNull();
    });

    it('shows that contact is online', () => {
      const { container } = render(<BusinessCard {...contact} online />);
      expect(container).toHaveTextContent(/online/i);
    });

    it('contains contact menu when contact is online', () => {
      const { getByTestId } = render(<BusinessCard {...contact} online />);
      const menuButton = getByTestId('overflow-menu');
      expect(menuButton).not.toBeNull();
    });

    it('contains contact menu when phone number is provided', () => {
      const { getByTestId } = render(<BusinessCard {...contact} phone={phone} />);
      const menuButton = getByTestId('overflow-menu');
      expect(menuButton).not.toBeNull();
    });

    it('contains contact menu when email is provided', () => {
      const { getByTestId } = render(<BusinessCard {...contact} email={email} />);
      const menuButton = getByTestId('overflow-menu');
      expect(menuButton).not.toBeNull();
    });

    it('contains online menu options when contact is online', () => {
      const { getByTestId } = render(<BusinessCard {...contact} online />);
      const overflowMenu = getByTestId('overflow-menu');
      const overflowMenuToggleButton = getByTestId('overflow-menu-toggle');
      overflowMenuToggleButton.click();
      const options = queryAllByText(overflowMenu, /chat/i);
      expect(options).toHaveLength(1);
    });

    it('contains phone menu options when phone number is provided', () => {
      const { getByTestId } = render(<BusinessCard {...contact} phone={phone} />);
      const overflowMenu = getByTestId('overflow-menu');
      const overflowMenuToggleButton = getByTestId('overflow-menu-toggle');
      overflowMenuToggleButton.click();
      const options = queryAllByText(overflowMenu, /call|sms/i);
      expect(options).toHaveLength(3);
    });

    it('contains email menu options when email is provided', () => {
      const { getByTestId } = render(<BusinessCard {...contact} email={email} />);
      const overflowMenu = getByTestId('overflow-menu');
      const overflowMenuToggleButton = getByTestId('overflow-menu-toggle');
      overflowMenuToggleButton.click();
      const options = queryAllByText(overflowMenu, /email/i);
      expect(options).toHaveLength(1);
    });
  });

  describe('Structure - Snapshots', () => {
    it('renders head shot', () => {
      const { container } = render(<BusinessCard {...contact} image={image} />);
      expect(container).toMatchSnapshot();
    });

    it('renders offline indicator', () => {
      const { container } = render(<BusinessCard {...contact} />);
      expect(container).toMatchSnapshot();
    });

    it('renders online indicator and contact menu', () => {
      const { container } = render(<BusinessCard {...contact} online />);
      expect(container).toMatchSnapshot();
    });

    it('renders contact menu when phone number is provided', () => {
      const { container } = render(<BusinessCard {...contact} phone={phone} />);
      expect(container).toMatchSnapshot();
    });

    it('renders contact menu when email is provided', () => {
      const { container } = render(<BusinessCard {...contact} email={email} />);
      expect(container).toMatchSnapshot();
    });

    it('renders chat menu options when contact is online', () => {
      const { container, getByTestId } = render(<BusinessCard {...contact} online />);
      getByTestId('overflow-menu-toggle').click();
      expect(container).toMatchSnapshot();
    });

    it('renders phone number menu options when phone number is provided', () => {
      const { container, getByTestId } = render(<BusinessCard {...contact} phone={phone} />);
      getByTestId('overflow-menu-toggle').click();
      expect(container).toMatchSnapshot();
    });

    it('renders email menu options when email is provided', () => {
      const { container, getByTestId } = render(<BusinessCard {...contact} email={email} />);
      getByTestId('overflow-menu-toggle').click();
      expect(container).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('invokes onChat', () => {
      const chatMock = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...contact} online onChat={chatMock} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/chat/i).click();
      expect(chatMock).toHaveBeenCalled();
    });

    it('invokes onVoiceCall', () => {
      const voiceCallMock = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...contact} phone={phone} onVoiceCall={voiceCallMock} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/voice call/i).click();
      expect(voiceCallMock).toHaveBeenCalled();
    });

    it('invokes onVideoCall', () => {
      const videoCallMock = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...contact} phone={phone} onVideoCall={videoCallMock} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/video call/i).click();
      expect(videoCallMock).toHaveBeenCalledTimes(1);
    });

    it('invokes onSMS', () => {
      const sendSMSMock = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...contact} phone={phone} onSMS={sendSMSMock} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/SMS/i).click();
      expect(sendSMSMock).toHaveBeenCalledTimes(1);
    });

    it('invokes onEmail', () => {
      const sendEmail = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...contact} email={email} onEmail={sendEmail} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/email/i).click();
      expect(sendEmail).toHaveBeenCalledTimes(1);
    });
  });
});
