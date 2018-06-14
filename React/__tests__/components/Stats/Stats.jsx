import React from 'react';
import Stats from '../../../src/components/Stats/Stats';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Stats children={[]}/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
