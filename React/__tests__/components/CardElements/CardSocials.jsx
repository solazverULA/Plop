import React from 'react';
import CardSocials from '../../../src/components/CardElements/CardSocials';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loading = renderer.create(
    <CardSocials socials={[]}/>
  ).toJSON();
  
  expect(loading).toMatchSnapshot();
});

