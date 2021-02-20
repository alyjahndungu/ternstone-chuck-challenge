import React from 'react'
import { mount } from 'enzyme'
import Header from './HeaderView'

const MOCK_HANDLE_FUNC = jest.fn()

describe('<Header /> test', () => {
  const wrapper = mount(<Header handleBtnClick={ MOCK_HANDLE_FUNC } />)

  it('Component should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('Component should render <BurgerIcon /> on init', () => {
    expect(wrapper.find('svg').text().match('burger')?.length).toEqual(1)
  })

  it('Component should render <CloseIcon /> after button click init', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.find('svg').text().match('close')?.length).toEqual(1)
  })
})
