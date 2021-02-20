import React from 'react'
import { mount } from 'enzyme'
import MainLayout from './MainLayoutView'
import { MOCK_LIST } from '../../__mocks__/mockJokeLIst'

const MOCK_HANDLE_FUNC = jest.fn()
const MOCK_HANDLE_CATEGORIES = jest.fn()
const MOCK_ERROR = null
const MOCK_LOADED = false

describe('<MainLayout /> test', () => {
  const wrapper = mount(<MainLayout handleCategories={ MOCK_HANDLE_CATEGORIES } handleJokesList={ MOCK_HANDLE_FUNC } list={ MOCK_LIST }
    isLoaded={ MOCK_LOADED } error={ MOCK_ERROR } />)

  it('Component should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
