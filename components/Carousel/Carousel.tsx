import React from 'react';
import { IMovie } from '@/interfaces/interfaces'
import { MovieCarousel } from "@/components/MovieCarousel/MovieCarousel";
import { ICarouselProps } from '@/interfaces/interfaces'

export const Carousel = ({ carouselTitle, data }:ICarouselProps) => {

  return (
    <section className='select-none'>
      <h3
        className='
          text-5xl
        '
      >
        {carouselTitle}
      </h3>
      <MovieCarousel data={data as IMovie[]} />
    </section>
  );
};