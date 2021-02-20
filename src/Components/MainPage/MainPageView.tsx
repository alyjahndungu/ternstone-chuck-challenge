import React, { useEffect, useState } from 'react'
import MainLayout from '../MainLayout'
import Header from '../Header'
import Footer from '../Footer'
import FavouriteList from '../FavouriteList/FavouriteListView'
import { FavListType, JokesListType, JokeType, RadioMode, RadioTypes } from '../../Types'
import ChuckNorrisService from '../../Services/chucknorris-service'

const MainPageView: React.FC = () => {
  const chuckNorrisService = new ChuckNorrisService()
  const [openFavList, setOpenFavList] = useState(false)

  const getStorageList = (key: string) => {
    const initList = window.localStorage.getItem(key)
    if (initList) {
      return [...JSON.parse(initList as string)]
    }
    return []
  }
  const [favList, setFavList] = useState(getStorageList('favList') as FavListType)
  const [list, setList] = useState([] as JokesListType)
  const [jokeList, setJokeList] = useState([] as JokesListType)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const initJokeList = (list: JokesListType) => {
    if (list) {
      return list.map((item) => {
        if (favList && favList.includes(item.id)) {
          return { ...item, isFavourite: true }
        }
        return item
      })
    } else return []
  }

  const objAsArray = (obj: JokeType | JokesListType) => {
    if (Array.isArray(obj)) {
      return obj
    } else {
      return [obj]
    }
  }

  useEffect(() => {
    let jokesFavList
    if (favList) {
      jokesFavList = favList.map(joke => chuckNorrisService.getJokeById(joke))
    }
    if (jokesFavList) {
      Promise.all(jokesFavList).then(result => {
        setList(objAsArray(result))
      }, (error: any) => {
        console.log(error)
      })
    }
  }, [])

  const getJokes = (obj: RadioMode) => {
    let getData
    if (obj.type === RadioTypes.Random) {
      getData = chuckNorrisService.getRandomJoke()
    } else if (obj.type === RadioTypes.Categories && obj.value) {
      getData = chuckNorrisService.getJokeByCategory(obj.value)
    } else if (obj.type === RadioTypes.Search && obj.value) {
      getData = chuckNorrisService.getJokeBySearch(obj.value)
    }
    if (getData) {
      getData.then((result) => {
        setIsLoaded(true)
        setJokeList((prevList) => {
          return [...prevList.map(item => item.isDataFromServer ? { ...item, isDataFromServer: false } : item)]
        })
        setList(objAsArray(result))
        setError(null)
      }, (error) => {
        setIsLoaded(true)
        setError(error)
      })
    }
  }

  useEffect(() => {
    setJokeList((prevList) => {
      const arr = initJokeList(list)
      const prev = prevList
        .filter(item => item.isFavourite)
      if (prev.length) {
        return [...prev.filter(item => !arr.some(e => e.id === item.id)), ...arr]
      } else {
        return arr
      }
    })
  }, [list])

  const handleCategories = (obj: RadioMode) => {
    getJokes(obj)
  }

  useEffect(() => window.localStorage.setItem('favList', JSON.stringify(favList)), [favList])

  const addFavItem = (id: string) => {
    const obj = jokeList.find(o => o.id === id)
    if (obj) {
      setFavList(favList => [...favList, obj.id])
      setJokeList(jokeList => jokeList.map(item => item.id === id ? { ...item, isFavourite: true } : item))
    }
    return favList
  }

  const deleteFavItem = (id: string, elem: string) => {
    setFavList(favList => favList.filter(e => e !== elem))
    setJokeList(jokeList => jokeList.map(item => item.id === id ? { ...item, isFavourite: false } : item))
  }

  const handleJokesList = (id: string) => {
    const elem = favList.indexOf(id)
    if (elem !== -1) {
      deleteFavItem(id, favList[elem])
    } else {
      addFavItem(id)
    }
  }

  const handleFavorites = (id: string) => {
    const elem = favList.indexOf(id)
    if (elem !== -1) {
      deleteFavItem(id, favList[elem])
    }
  }

  const handleBtnClick = () => {
    setOpenFavList(!openFavList)
  }

  return (<>
    <Header handleBtnClick={ () => handleBtnClick() } />
    <MainLayout handleCategories={ handleCategories } handleJokesList={ handleJokesList } list={ jokeList }
      error={ error } isLoaded={ isLoaded } />
    <FavouriteList handleFavorites={ handleFavorites } openFavList={ openFavList } favList={ jokeList } />
    <Footer />
  </>)
}

export default MainPageView
