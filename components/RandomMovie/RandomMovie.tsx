import React, { useEffect, useState } from 'react';
import { IRandomMovieProps, IMovie } from '@/interfaces/interfaces'

export const RandomMovie = ({ data }:IRandomMovieProps) => {

  const [display, setDisplay] = useState<IMovie>()

  useEffect(() => {
    if(data) {
      setInterval(() => {
        const randomIndex = Math.floor(Math.random() * data.length)
        setDisplay(data[randomIndex])
      }, 1500)
    }
  }, [data])

  return (
    display && (
    <section
      style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${display.backdrop_path}')` }}
      className={`
      h-[750px] 
      bg-cover
      backdrop-blur-md backdrop-invert`}>
    </section>)
  );
};