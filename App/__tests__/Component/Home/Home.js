import 'react-native';
import React from 'react';
import Home from '../../../app/Components/Home/Home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Home />
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
