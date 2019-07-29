import React from 'react';
import PropTypes from 'prop-types';
import { Title, ContactsContainer } from './styles';

const ContactsList = ({ title, children }) => (
  <section>
    <Title>{title}</Title>
    <ContactsContainer>{children}</ContactsContainer>
  </section>
);

ContactsList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
};

ContactsList.defaultProps = {
  title: 'Contacts',
  children: null,
};

export default ContactsList;
