import React from 'react'
import { shallow } from 'enzyme'
import Footer from './FooterView'

it('Component Footer should render without crashing', () => {
  expect(shallow(<Footer />).exists()).toBeTruthy()
})
