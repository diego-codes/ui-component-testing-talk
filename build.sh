#!/bin/bash

# Clean up previous docs
rm -fr docs
mkdir docs

# Copy slides to docs
cp -R slides/* docs

# Rebuild storybook
npm run build-storybook -- -o docs/storybook