import React from 'react';
import Register from '../../../src/views/Register/Register';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Register/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
