import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { OverflowMenu, MenuItem } from '../OverflowMenu';
import {
  Container,
  ContactInfo,
  ContactInfoWrapper,
  Avatar,
  FullName,
  Subtitle,
  Footer,
  OnlineStatus,
  LoadingText,
  LoadingTitle,
} from './styles';

const ContactCard = props => {
  const {
    loading,
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
  } = props;

  return (
    <Container>
      <ContactInfo>
        {!loading && image && (
          <Avatar
            role="img"
            aria-label={`Avatar image of ${firstName}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
        <ContactInfoWrapper>
          {loading ? <LoadingTitle /> : <FullName>{`${firstName} ${lastName}`}</FullName>}
          {loading ? <LoadingText /> : <Subtitle>{`${title} — ${business}`}</Subtitle>}
        </ContactInfoWrapper>
      </ContactInfo>
      <Footer>
        {!loading && <OnlineStatus online={online}>{online ? 'Online' : 'Offline'}</OnlineStatus>}
        {!loading && (online || phone || email) && (
          <OverflowMenu toggleText={`Contact ${firstName}`} flipped>
            {online && <MenuItem onClick={onChat}>Start chat</MenuItem>}
            {phone && (
              <Fragment>
                <MenuItem onClick={onVoiceCall}>Start voice call</MenuItem>
                <MenuItem onClick={onVideoCall}>Start video call</MenuItem>
                <MenuItem onClick={onSMS}>Send SMS</MenuItem>
              </Fragment>
            )}
            {email && <MenuItem onClick={onEmail}>Send email</MenuItem>}
          </OverflowMenu>
        )}
      </Footer>
    </Container>
  );
};

ContactCard.propTypes = {
  loading: PropTypes.bool,
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

ContactCard.defaultProps = {
  loading: false,
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

export default ContactCard;
