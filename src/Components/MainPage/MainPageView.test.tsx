import React from 'react'
import { shallow } from 'enzyme'
import MainPage from './MainPageView'

describe('<MainPage /> test', () => {
  const wrapper = shallow(<MainPage />)

  it('Component should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
