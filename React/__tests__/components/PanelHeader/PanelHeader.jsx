import React from 'react';
import PanelHeader from '../../../src/components/PanelHeader/PanelHeader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <PanelHeader/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
