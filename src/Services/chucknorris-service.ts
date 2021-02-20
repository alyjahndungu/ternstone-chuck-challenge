import { ChuckNorrisApiJokeType, JokeType } from '../Types'

import moment from 'moment'

export default class ChuckNorrisService {
  _apiBase = 'https://api.chucknorris.io'

  getResource = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json()
  }

  getRandomJoke = async () => {
    const joke = await this.getResource('/jokes/random/')
    return this._transformJoke(joke)
  }

  getCategories = async () => {
    return await this.getResource('/jokes/categories/')
  }

  getJokeById = async (id: string) => {
    const joke = await this.getResource(`/jokes/${id}`)
    return this._transformJoke(joke)
  }

  getJokeByCategory = async (category: string) => {
    const joke = await this.getResource(`/jokes/random?category=${category}`)
    return this._transformJoke(joke)
  }

  getJokeBySearch = async (query: string) => {
    const jokes = await this.getResource(`/jokes/search?query=${query}`)
    return jokes.result
      .map(this._transformJoke)
      .slice(0, 50)
  };

  _transformTime = (updated: string) => {
    const date = Date.parse(updated)
    if (date) {
      return moment(date).fromNow()
    } else {
      const startDate = moment(updated, 'YYYY-MM-DD HH:mm').toDate()
      return moment(startDate).fromNow()
    }
  }

  _transformJoke = (joke: ChuckNorrisApiJokeType): JokeType => {
    return {
      id: joke.id,
      url: joke.url,
      text: joke.value,
      categories: joke.categories,
      updatedAt: this._transformTime(joke.updated_at),
      isFavourite: false,
      isDataFromServer: true
    }
  }
}
