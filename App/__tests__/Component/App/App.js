import 'react-native';
import React from 'react';
import App from '../../../app/Components/App/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <App />
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
