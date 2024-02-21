import React, { useRef } from 'react';
import { IMovieCardProps } from "@/interfaces/interfaces";
import { Star } from '@/images/star'

export const MovieCard = ({info, last}:IMovieCardProps) => {

  const lastElementRef = useRef<HTMLDivElement>(null)

  return(
    <div
      className={`
        flex
        h-[500px]
        w-[280px]
        shrink-0
        flex-col
        items-center
        `}
      ref={last ? lastElementRef : undefined}
    >
      <img alt={info.title} src={`https://image.tmdb.org/t/p/original${info.poster_path}`} className='rounded-xl' />
      <div className='w-[100%] flex items-center justify-between p-2 box-border'>
        <span>{info.title}</span>
        <div className='flex items-center justify-between w-[75px]'>
          {info.vote_average.toFixed(2)}
          <Star />
        </div>
      </div>
    </div>
    )
};
