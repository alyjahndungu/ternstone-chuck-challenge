import React from 'react'
import { mount } from 'enzyme'
import SearchPanel from './SearchPanelView'

const MOCK_HANDLE_CATEGORIES = jest.fn()

describe('<MainLayout /> test', () => {
  const wrapper = mount(<SearchPanel handleCategories={ MOCK_HANDLE_CATEGORIES } />)

  it('Component should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('Element search input should render without error message on init', () => {
    expect(wrapper.find('.inputError').length).toBe(0)
  })
})
