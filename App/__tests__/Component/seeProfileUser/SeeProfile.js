import 'react-native';
import React from 'react';
import SeeProfile from '../../../app/Components/seeProfileUser/Seeprofile';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <SeeProfile Profile={{}} User={{}} />
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
