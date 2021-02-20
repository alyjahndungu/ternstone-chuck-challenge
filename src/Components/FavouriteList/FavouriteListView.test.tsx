import React from 'react'
import { mount } from 'enzyme'
import FavouriteList from './FavouriteListView'
import { MOCK_LIST } from '../../__mocks__/mockJokeLIst'

const MOCK_HANDLE_FUNC = jest.fn()
const MOCK_FAV_OPEN = false
const MOCK_CLASS_NAME = 'Favorite--open'

describe('<FavouriteList /> test', () => {
  let wrapper = mount(<FavouriteList favList={ MOCK_LIST } openFavList={ MOCK_FAV_OPEN } handleFavorites={ MOCK_HANDLE_FUNC } />)

  it('Component should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`Component should render <aside /> without className ${MOCK_CLASS_NAME}`, () => {
    expect(wrapper.find('aside').hasClass('Favorite--open')).toBeTruthy()
  })

  it(`Component should render <aside /> with className ${MOCK_CLASS_NAME}`, () => {
    const MOCK_FAV_OPEN = true
    wrapper = mount(<FavouriteList favList={ MOCK_LIST } openFavList={ MOCK_FAV_OPEN } handleFavorites={ MOCK_HANDLE_FUNC } />)
    expect(wrapper.find('aside').hasClass('Favorite--open')).toBeFalsy()
  })

  it('Component should render only li with isFavorite: true option', () => {
    expect(wrapper.find('li .JokeItem__text').text()).toEqual('fav')
    expect(wrapper.find('li .JokeItem__text').text().match('notfav')).toBeFalsy()
  })
})
