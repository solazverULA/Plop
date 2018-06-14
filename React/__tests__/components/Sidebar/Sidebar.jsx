import React from 'react';
import Sidebar from '../../../src/components/Sidebar/Sidebar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Sidebar routes={[]} />
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
