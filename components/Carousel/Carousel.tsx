import React from 'react';
import { IMovie } from '@/interfaces/interfaces'
import { MovieCoursel } from "@/components/MovieCarousel/MovieCoursel";
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
      <MovieCoursel data={data as IMovie[]} />
    </section>
  );
};