import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import Container from './Container';

const loadStories = () => {
  const req = require.context('../src', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => <Container story={story} />);
addDecorator(withA11y)

configure(loadStories, module);