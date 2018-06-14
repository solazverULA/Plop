import React from 'react';
import CustomButton from '../../../src/components/CustomButton/CustomButton';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <CustomButton/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
