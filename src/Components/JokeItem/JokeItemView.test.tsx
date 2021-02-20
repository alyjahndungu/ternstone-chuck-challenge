import React from 'react'
import { mount } from 'enzyme'
import JokeItem from './JokeItemView'

const MOCK_HANDLE_FUNC = jest.fn()
const MOCK_LIST_ITEM = {
  id: 'string',
  url: 'string',
  text: 'fav',
  categories: 'string',
  updatedAt: 'string',
  isFavourite: false,
  isDataFromServer: true
}

const MOCK_CLASS_NAME = 'class'

describe('<JokeItem /> test', () => {
  let wrapper = mount(<JokeItem className={ MOCK_CLASS_NAME } handleItem={ MOCK_HANDLE_FUNC } { ...MOCK_LIST_ITEM } />)

  it('Component should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`Component should render <li /> with className ${MOCK_CLASS_NAME}`, () => {
    expect(wrapper.find('li.JokeItem').hasClass(MOCK_CLASS_NAME)).toBeTruthy()
  })

  it('Component should render <HeartEmptyIcon /> ', () => {
    expect(wrapper.find('svg').first().text().match('heart-empty')?.length).toBe(1)
    expect(wrapper.find('svg').first().text().match('heart-full')?.length).toBeFalsy()
  })

  it('Component should render <HeartFullIcon /> ', () => {
    wrapper = mount(<JokeItem className={ MOCK_CLASS_NAME } handleItem={ MOCK_HANDLE_FUNC } { ...MOCK_LIST_ITEM } isFavourite={ true } />)
    expect(wrapper.find('svg').first().text().match('heart-empty')?.length).toBeFalsy()
    expect(wrapper.find('svg').first().text().match('heart-full')?.length).toBe(1)
  })

  it('Component should render <div /> with categories class', () => {
    expect(wrapper.find('.JokeItem__category').length).toEqual(1)
  })

  it('Component should not render <div /> with categories class', () => {
    wrapper = mount(<JokeItem className={ MOCK_CLASS_NAME } handleItem={ MOCK_HANDLE_FUNC } { ...MOCK_LIST_ITEM } categories={ '' } />)
    expect(wrapper.find('.JokeItem__category').length).toEqual(0)
  })
})
