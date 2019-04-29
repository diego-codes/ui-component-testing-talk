import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from '../src/GlobalStyle';

const Container = ({ story }) => <div><GlobalStyle />{story()}</div>;

Container.propTypes = {
  story: PropTypes.func.isRequired,
};

export default Container;
