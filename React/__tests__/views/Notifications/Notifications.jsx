import React from 'react';
import Notifications from '../../../src/views/Notifications/Notifications';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Notifications/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
