import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { OverflowMenu, OverflowMenuItem } from '../OverflowMenu';
import {
  Container,
  ContactInfo,
  HeadShot,
  FullName,
  Subtitle,
  Footer,
  OnlineStatus,
} from './styles';

const BusinessCard = ({
  firstName,
  lastName,
  title,
  business,
  online,
  image,
  phone,
  email,
  onChat,
  onVoiceCall,
  onVideoCall,
  onSMS,
  onEmail,
}) => (
  <Container>
    <ContactInfo>
      {image && <HeadShot image={image} data-testid="business-card-image" />}
      <div>
        <FullName>{`${firstName} ${lastName}`}</FullName>
        <Subtitle>{`${title} — ${business}`}</Subtitle>
      </div>
    </ContactInfo>
    <Footer>
      <OnlineStatus online={online}>{online ? 'Online' : 'Offline'}</OnlineStatus>
      {(online || phone || email) && (
        <OverflowMenu toggleText={`Contact ${firstName}`} flipped>
          {online && <OverflowMenuItem onClick={onChat}>Start chat</OverflowMenuItem>}
          {phone && (
            <Fragment>
              <OverflowMenuItem onClick={onVoiceCall}>Start voice call</OverflowMenuItem>
              <OverflowMenuItem onClick={onVideoCall}>Start video call</OverflowMenuItem>
              <OverflowMenuItem onClick={onSMS}>Send SMS</OverflowMenuItem>
            </Fragment>
          )}
          {email && <OverflowMenuItem onClick={onEmail}>Send email</OverflowMenuItem>}
        </OverflowMenu>
      )}
    </Footer>
  </Container>
);

BusinessCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  business: PropTypes.string.isRequired,
  online: PropTypes.bool,
  image: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  onChat: PropTypes.func,
  onVoiceCall: PropTypes.func,
  onVideoCall: PropTypes.func,
  onSMS: PropTypes.func,
  onEmail: PropTypes.func,
};

BusinessCard.defaultProps = {
  online: false,
  image: undefined,
  phone: undefined,
  email: undefined,
  onChat: () => {},
  onVoiceCall: () => {},
  onVideoCall: () => {},
  onSMS: () => {},
  onEmail: () => {},
};

export default BusinessCard;
