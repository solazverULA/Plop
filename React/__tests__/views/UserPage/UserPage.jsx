import React from 'react';
import UserPage from '../../../src/views/UserPage/UserPage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <UserPage/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
