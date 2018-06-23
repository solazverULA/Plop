import 'react-native';
import React from 'react';
import DeleteSuscription from '../../../app/Components/DeleteSuscription/DeleteSuscription';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <DeleteSuscription />
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
