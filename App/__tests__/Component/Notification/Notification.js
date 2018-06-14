import 'react-native';
import React from 'react';
import Notification from '../../../app/Components/Notification/Notification';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Notification />
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
