import React from 'react';
import { render, queryByTestId, queryAllByText } from 'react-testing-library';
import BusinessCard from '.';

const user = {
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
            firstName={user.firstName}
            lastName={user.lastName}
            title={user.title}
            business={user.business}
          />
        )
      ).not.toThrow());

    it('contains full name', () => {
      const { container } = render(<BusinessCard {...user} />);
      expect(container).toHaveTextContent(`${user.firstName} ${user.lastName}`);
    });

    it('displays headshot', () => {
      const { getByTestId } = render(<BusinessCard {...user} image={image} />);
      const headShot = getByTestId('business-card-image');
      expect(headShot).not.toBeNull();
    });

    it('doesn not display headshot if image is not provided', () => {
      const { container } = render(<BusinessCard {...user} />);
      const headShot = queryByTestId(container, 'business-card-image');
      expect(headShot).toBeNull();
    });

    it('shows that user is online', () => {
      const { container } = render(<BusinessCard {...user} online />);
      expect(container).toHaveTextContent(/online/i);
    });

    it('does not contain contact menu when contact info is not provided', () => {
      const { container } = render(<BusinessCard {...user} />);
      const menuButton = queryByTestId(container, 'overflow-menu');
      expect(menuButton).toBeNull();
    });

    it('contains contact menu when phone number is provided', () => {
      const { getByTestId } = render(<BusinessCard {...user} phone={phone} />);
      const menuButton = getByTestId('overflow-menu');
      expect(menuButton).not.toBeNull();
    });

    it('contains contact menu when email is provided', () => {
      const { getByTestId } = render(<BusinessCard {...user} email={email} />);
      const menuButton = getByTestId('overflow-menu');
      expect(menuButton).not.toBeNull();
    });

    it('contains phone menu options when phone number is provided', () => {
      const { getByTestId } = render(<BusinessCard {...user} phone={phone} />);
      const overflowMenu = getByTestId('overflow-menu');
      const overflowMenuToggleButton = getByTestId('overflow-menu-toggle');
      overflowMenuToggleButton.click();
      const options = queryAllByText(overflowMenu, /call|sms/i);
      expect(options).toHaveLength(3);
    });

    it('contains email menu options when email is provided', () => {
      const { getByTestId } = render(<BusinessCard {...user} email={email} />);
      const overflowMenu = getByTestId('overflow-menu');
      const overflowMenuToggleButton = getByTestId('overflow-menu-toggle');
      overflowMenuToggleButton.click();
      const options = queryAllByText(overflowMenu, /email/i);
      expect(options).toHaveLength(1);
    });
  });

  describe('Structure - Snapshots', () => {
    it('renders head shot', () => {
      const { container } = render(<BusinessCard {...user} image={image} />);
      expect(container).toMatchSnapshot();
    });

    it('renders offline indicator', () => {
      const { container } = render(<BusinessCard {...user} />);
      expect(container).toMatchSnapshot();
    });

    it('renders online indicator', () => {
      const { container } = render(<BusinessCard {...user} online />);
      expect(container).toMatchSnapshot();
    });

    it('renders contact menu when phone number is provided', () => {
      const { container } = render(<BusinessCard {...user} phone={phone} />);
      expect(container).toMatchSnapshot();
    });

    it('renders contact menu when email is provided', () => {
      const { container } = render(<BusinessCard {...user} email={email} />);
      expect(container).toMatchSnapshot();
    });

    it('renders phone number menu options when phone number is provided', () => {
      const { container, getByTestId } = render(<BusinessCard {...user} phone={phone} />);
      getByTestId('overflow-menu-toggle').click();
      expect(container).toMatchSnapshot();
    });

    it('renders email menu options when email is provided', () => {
      const { container, getByTestId } = render(<BusinessCard {...user} email={email} />);
      getByTestId('overflow-menu-toggle').click();
      expect(container).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('invokes onVoiceCall', () => {
      const voiceCallMock = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...user} phone={phone} onVoiceCall={voiceCallMock} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/voice call/i).click();
      expect(voiceCallMock).toHaveBeenCalled();
    });

    it('invokes onVideoCall', () => {
      const videoCallMock = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...user} phone={phone} onVideoCall={videoCallMock} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/video call/i).click();
      expect(videoCallMock).toHaveBeenCalledTimes(1);
    });

    it('invokes onSMS', () => {
      const sendSMSMock = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...user} phone={phone} onSMS={sendSMSMock} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/SMS/i).click();
      expect(sendSMSMock).toHaveBeenCalledTimes(1);
    });

    it('invokes onEmail', () => {
      const sendEmail = jest.fn();
      const { getByTestId, getByText } = render(
        <BusinessCard {...user} email={email} onEmail={sendEmail} />
      );
      getByTestId('overflow-menu-toggle').click();
      getByText(/email/i).click();
      expect(sendEmail).toHaveBeenCalledTimes(1);
    });
  });
});
