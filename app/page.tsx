'use client'

import React, {useEffect, useState} from 'react';
import { Carousel } from "@/components/Carousel/Carousel";
import { RandomMovie } from "@/components/RandomMovie/RandomMovie";
import {IMovie} from "@/interfaces/interfaces";
import {getTrendingMovies} from "@/functions/getTrendingMovies";
import {getPlayingMovies} from "@/functions/getPlayingMovies";
import { getTopRatedMovies } from '@/functions/getTopRatedMovies'
import { getUpcomingMovies } from '@/functions/getUpcomingMovies'

const Page = () => {

  const [trending, setTrending] = useState<IMovie[]>()
  const [playing, setPlaying] = useState<IMovie[]>()
  const [topRated, setTopRated] = useState<IMovie[]>()
  const [upcoming, setUpcoming] = useState<IMovie[]>()

  useEffect(() => {
    getTrendingMovies()
      .then(res => setTrending(res.data.results))
      .catch(err => console.log(err))

    getPlayingMovies()
      .then(res => setPlaying(res.data.results))
      .catch(err => console.log(err))

    getTopRatedMovies()
      .then(res => setTopRated(res.data.results))
      .catch(err => console.log(err))

    getUpcomingMovies()
      .then(res => setUpcoming(res.data.results))
      .catch(err => console.log(err))
  }, []);

  return (
    <main
      className='
        w-[100%]
        h-[100dvh]
        bg-primary
    '>
      <RandomMovie data={trending as IMovie[]} />
      <section className='bg-primary p-[15px]'>
        <Carousel carouselTitle={'Trending Movies'} data={trending as IMovie[]} />
        <Carousel carouselTitle={'Now playing'} data={playing as IMovie[]} />
        <Carousel carouselTitle={'Best Of All Time'} data={topRated as IMovie[]} />
        <Carousel carouselTitle={'Upcoming'} data={upcoming as IMovie[]} />
      </section>
    </main>
  );
};

export default Page;