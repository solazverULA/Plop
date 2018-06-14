import React from 'react';
import Login from '../../../src/views/Login/Login';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Login/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
