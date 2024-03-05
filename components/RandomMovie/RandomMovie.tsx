import React, { useEffect, useState, useRef } from 'react';
import { IRandomMovieProps, IMovie } from '@/interfaces/interfaces'
import { gsap } from 'gsap'
import {useGSAP} from "@gsap/react";
import { getGenres } from '@/functions/getGenre'
import { IGenre } from '@/interfaces/interfaces'

export const RandomMovie = ({ data }:IRandomMovieProps) => {

  const [display, setDisplay] = useState<IMovie>()
  const [genres, setGenres] = useState<string[]>()
  const randomMovieRef = useRef<HTMLImageElement>(null)
  const randomMovieImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(data) changeRandomMovie()
  }, [data]);

  useEffect(() => {
    if(!display) return

    getGenres().then(res =>{
      let genresList:string[] = []
      res.data.genres.forEach((genre:IGenre) => {
        display.genre_ids.includes(genre.id) && (genresList.push(genre.name))
      })

      setGenres(genresList)
    })
  }, [display])

  useGSAP(() => {
    if(!display) return

    gsap.fromTo(randomMovieImageRef.current!, {
      scale: 1,
    }, {
      scale: 1.1,
      duration: 8
    })

    gsap.timeline()
      .fromTo(randomMovieRef.current!, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 3
      })
      .to(randomMovieRef.current!, {
        opacity: 0,
        duration: 2,
        delay: 3,
        onComplete: () => changeRandomMovie()
      })
  }, [display])

  const changeRandomMovie = () => {
    let randomIndex = Math.abs(Math.floor(Math.random() * data.length - 1))
    while(data[randomIndex].title === display?.title){
      randomIndex = Math.abs(Math.floor(Math.random() * data.length - 1))
    }
    setDisplay(data[randomIndex])
  }

  const displayGenres = genres?.map((genre, key) => <span key={key}>{genre}{key !== genres.length - 1 && ' - '}</span>)

  return (
    <section className={'relative'} ref={randomMovieRef}>
      <img src={`https://image.tmdb.org/t/p/original${display?.poster_path}`} className='
          w-[380px]
          rounded-lg
          absolute
          bottom-[-30px]
          left-[280px]
          z-20

          small:hidden
          xs:hidden
        '/>
      <div className='overflow-hidden'>
        <div
          ref={randomMovieImageRef}
          style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${display?.backdrop_path}')`}}
          className='
            h-[600px]
            text-center
            relative
            bg-cover
            brightness-[30%]

            sm:h-[420px]

            xs:h-[375px]
            '
        />
      </div>
      <div
        className='
        absolute
        top-[50%]
        left-[1020px]
        translate-x-[-300px]
        translate-y-[-50%]
        flex

        small:left-[50%]
        small:translate-x-[-50%]

        xs:left-[50%]
        xs:translate-x-[-50%]
        '
      >
        <div className='min-w-[400px]'>
          <p>
            {display?.release_date}
          </p>
          <p className='
          text-6xl
          font-bold

          sm:text-3xl

          xs:text-2xl
          '>
            {display?.title}
          </p>
          <p className='
          text-2xl

          sm:text-sm

          xs:text-sm
          '>
            {displayGenres}
          </p>
          <p className='
          xs:text-xs
          xs:line-clamp-6
          '>
            {display?.overview}
          </p>
        </div>
      </div>
    </section>)
};