import React from 'react'
import { mount } from 'enzyme'
import JokesList from './JokesListView'
import { MOCK_LIST } from '../../__mocks__/mockJokeLIst'

const MOCK_HANDLE_FUNC = jest.fn()

describe('<JokesList /> test', () => {
  const wrapper = mount(<JokesList list={ MOCK_LIST } handleJokesList={ MOCK_HANDLE_FUNC } />)

  it('Component should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('Component should render only li with isDataFromServer: true option', () => {
    expect(wrapper.find('li').length).toEqual(1)
  })
})
