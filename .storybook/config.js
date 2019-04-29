import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Container from './Container';

const loadStories = () => {
  const req = require.context('../src', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addDecorator(withA11y)

addDecorator(story => <Container story={story} />);

configure(loadStories, module);