import React from 'react';
import CustomRadio from '../../../src/components/CustomRadio/CustomRadio';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <CustomRadio/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
