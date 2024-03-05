import React, { useRef, useEffect } from 'react';
import { IMovieCardProps } from "@/interfaces/interfaces";
import { Star } from '@/images/star'

export const MovieCard = ({info, last, setLastCard}:IMovieCardProps) => {

  const lastElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lastElementRef && setLastCard && setLastCard(lastElementRef.current!)
  }, [])

  return(
    <div
      className={`
        flex
        w-[280px]
        shrink-0
        flex-col
        items-center
        
        small:w-[180px]
        
        xs:w-[180px]
        `}
      ref={last ? lastElementRef : undefined}
    >
      <img alt={info.title} src={`https://image.tmdb.org/t/p/original${info.poster_path}`} className='rounded-xl h-[420px] small:h-[270px] xs:h-[270px]' />
      <div className='
      w-[100%]
      flex
      items-center
      justify-between
      p-2
      box-border

      small:text-sm

      xs:text-sm
      '>
        <div className='max-w-[160px]'>{info.title}</div>
        <div className='
        flex
        items-center
        justify-between
        w-[75px]

        small:w-[65px]
        small:gap-2

        xs:w-[65px]
        xs:gap-2
        '>
          {info.vote_average.toFixed(2)}
          <Star />
        </div>
      </div>
    </div>
    )
};
