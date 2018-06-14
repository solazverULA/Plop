import 'react-native';
import React from 'react';
import AllNotification from '../../../app/Components/AllNotification/AllNotification';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <AllNotification/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
