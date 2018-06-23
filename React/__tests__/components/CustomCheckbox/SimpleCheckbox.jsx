import React from 'react';
import SimpleCheckbox from '../../../src/components/CustomCheckbox/SimpleCheckbox';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <SimpleCheckbox/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
