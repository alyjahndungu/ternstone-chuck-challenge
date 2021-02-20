import React from 'react'
import './JokesListStyle.scss'
import JokeItem from '../JokeItem'
import { JokesListType } from '../../Types'
import LazyLoad from 'react-lazyload'
import Loader from '../Loader'

type Props = {
  list: JokesListType
  handleJokesList: (id: string) => void
}

const JokesListView: React.FC<Props> = ({ list, handleJokesList }) => {
  return (<div className="Jokes">
    <ul className="Jokes__list">
      { list.filter(item => item.isDataFromServer).map((item) => {
        return <LazyLoad key={ item.id } overflow placeholder={ <Loader /> } >
          <JokeItem handleItem={ () => handleJokesList(item.id) }
            className="Jokes__item"
            key={ item.id }
            { ...item } />
        </LazyLoad>
      }) }
    </ul>
  </div>)
}

export default JokesListView
