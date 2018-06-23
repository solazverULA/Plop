import React from 'react';
import CardAuthor from '../../../src/components/CardElements/CardAuthor';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <CardAuthor/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
