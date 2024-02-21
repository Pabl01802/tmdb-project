import React from 'react'

export interface IMovieCardProps {
  info: IMovie,
  last?: boolean,
}

export interface IMovie {
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export interface IMovieCourselProps {
  data: IMovie[]
}

export interface ICarouselProps {
  carouselTitle: string,
  data: IMovie[]
}

export interface IRandomMovieProps {
  data: IMovie[]
}