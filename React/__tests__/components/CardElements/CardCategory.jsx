import React from 'react';
import CardCategory from '../../../src/components/CardElements/CardCategory';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <CardCategory/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
