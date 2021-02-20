import React from 'react'
import { shallow } from 'enzyme'
import App from './AppView'

it('Component App should render without crashing', () => {
  expect(shallow(<App />).exists()).toBeTruthy()
})
