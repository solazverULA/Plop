import React from 'react';
import Tasks from '../../../src/components/Tasks/Tasks';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Tasks tasks={[]}/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
