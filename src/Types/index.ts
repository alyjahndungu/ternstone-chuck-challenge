export interface ChuckNorrisApiJokeType {
  id: string
  icon_url: string
  url: string
  value: string
  created_at: string
  categories: string
  updated_at: string
}

export interface JokeType {
  id: string
  url: string
  text: string
  categories: string
  updatedAt: string
  isFavourite: boolean
  isDataFromServer: boolean
}

export type JokesListType = Array<JokeType>

export type FavListType = Array<string>

export enum RadioTypes {
  Random = 'random',
  Categories = 'categories',
  Search = 'search'
}

export type RadioMode = {
  type: RadioTypes
  value?: string
}
