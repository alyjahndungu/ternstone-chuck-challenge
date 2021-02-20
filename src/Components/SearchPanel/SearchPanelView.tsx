import React, { useEffect, useState } from 'react'
import './SearchPanelStyle.scss'
import ChuckNorrisService from '../../Services/chucknorris-service'
import { RadioMode, RadioTypes } from '../../Types'

type Props = {
  handleCategories: (obj: RadioMode) => void
}

enum RadioSubTypes {
  Category = 'category',
  Search = 'search'
}

const SearchPanelView: React.FC<Props> = ({ handleCategories }) => {
  const chuckNorrisService = new ChuckNorrisService()
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [categories, setCategories] = useState([] as Array<string>)
  const [radioVal, setRadioVal] = useState({ type: RadioTypes.Random } as RadioMode)
  const [searchValid, setSearchValid] = useState(true)

  const getCategories = () => {
    chuckNorrisService
      .getCategories()
      .then((result) => {
        setIsLoaded(true)
        setCategories(result)
      }, (error) => {
        setIsLoaded(true)
        setError(error)
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValid(true)
    if (e.target.name === RadioSubTypes.Search) {
      if (e.target.value.length < 3) {
        return setSearchValid(false)
      } else {
        return setRadioVal({ type: RadioTypes.Search, value: e.target.value })
      }
    } else if (e.target.name === RadioSubTypes.Category) {
      return setRadioVal({ type: RadioTypes.Categories, value: e.target.id })
    } else {
      return setRadioVal({ type: e.target.id as RadioTypes })
    }
  }

  const renderCategories = () => {
    if (!error) {
      return (<div className="SearchPanel__item">
        <input className="SearchPanel__input" type="radio" id="categories"
          name="filters" value="categories"
          onChange={ e => handleChange(e) } />
        <label htmlFor="categories">From categories</label>
        <ul className="SearchPanel__categories">
          { !isLoaded && <span>loading</span> }
          { isLoaded && categories.map(category => {
            return <li key={ category }>
              <input className="SearchPanel__checkbox" id={ category } type="radio" value={ category }
                name={ `${RadioSubTypes.Category}` }
                onChange={ e => handleChange(e) } />
              <label htmlFor={ category }>{ category }</label> </li>
          }) }
        </ul>
      </div>)
    }
  }

  return (<div className="SearchPanel">
    <div className="SearchPanel__item">
      <input className="SearchPanel__input" type="radio" id="random" name="filters" value="random"
        onChange={ e => handleChange(e) }
        defaultChecked />
      <label htmlFor="random">Random</label>
    </div>
    { renderCategories() }
    {/* <div className="SearchPanel__item">
      <input className="SearchPanel__input" type="radio" id="search" name="filters" value="search"
        onChange={ e => handleChange(e) } />
      <label htmlFor="search">Search</label>
      <input className="SearchPanel__search" type="search" id="SiteSearch" name={ `${RadioSubTypes.Search}` }
        placeholder="Free text search..."
        aria-label="Search through jokes"
        onChange={ e => handleChange(e) } />
      { !searchValid && <span className="inputError">Text size must be between 3 and 120 characters</span> }
    </div> */}
    <button onClick={ () => handleCategories(radioVal) } className="SearchPanel__button">
      <span>Get a joke</span>
    </button>
  </div>)
}

export default SearchPanelView
