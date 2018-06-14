import React from 'react';
import Footer from '../../../src/components/Footer/Footer';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <Footer/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});
