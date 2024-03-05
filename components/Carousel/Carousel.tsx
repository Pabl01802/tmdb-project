import React from 'react';
import { IMovie } from '@/interfaces/interfaces'
import { MovieCarousel } from "@/components/MovieCarousel/MovieCarousel";
import { ICarouselProps } from '@/interfaces/interfaces'

export const Carousel = ({ carouselTitle, data }:ICarouselProps) => {

  return (
    <section className='
    select-none
    '>
      <h3
        className='
          text-5xl
          relative
          w-max

          small:text-4xl

          xs:text-3xl

          after:absolute
          after:bottom-[-15px]
          after:left-[3px]
          after:w-[25%]
          after:h-[4px]
          after:bg-red
        '
      >
        {carouselTitle}
      </h3>
      <MovieCarousel data={data as IMovie[]} />
    </section>
  );
};