import React from 'react';
import FormInputs from '../../../src/components/FormInputs/FormInputs';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <FormInputs ncols={[]} />
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
