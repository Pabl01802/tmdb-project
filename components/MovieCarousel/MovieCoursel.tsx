import React, {useEffect, useRef, useState, forwardRef } from 'react';
import {SliderArrow} from "@/images/sliderArrow";
import {IMovie} from "@/interfaces/interfaces";
import {MovieCard} from "@/components/MovieCard/MovieCard";
import { IMovieCourselProps } from '@/interfaces/interfaces'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

export const MovieCoursel = ({ data }:IMovieCourselProps) => {

  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [lastElement, setLastElement] = useState(null)

  const sliderRef = useRef<HTMLDivElement>(null)
  const rightArrowRef = useRef<HTMLDivElement>(null)
  const leftArrowRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const maxScroll = ScrollTrigger.maxScroll(sliderRef.current, true)
    if(maxScroll > 0 && scrollPosition >= maxScroll){
      rightArrowRef.current.style.display = 'none'
    }else{
      rightArrowRef.current.style.display = 'flex'
    }
    if(scrollPosition <= 0){
      leftArrowRef.current.style.display = 'none'
    }else{
      leftArrowRef.current.style.display = 'flex'
    }
  }, [scrollPosition]);

  const handleSlider = (direction:string) => {
    let scrollValue:number = 550
    gsap.registerPlugin(ScrollToPlugin)
    if(direction === 'right'){
      gsap.to(sliderRef.current, {
        duration: 1,
        scrollTo: { x: scrollPosition + scrollValue }
      })
      setScrollPosition(prev => prev + scrollValue)
    }
    if(direction === 'left' || rightArrowRef.current.style.display === 'none'){
      gsap.to(sliderRef.current, {
        duration: 1,
        scrollTo: { x: scrollPosition - scrollValue },
      })
      setScrollPosition(prev => prev - scrollValue)
    }
  }

  return (
    <section
      className='
          p-10
          relative
        '
    >
      <div
        ref={leftArrowRef}
        onClick={() => handleSlider('left')}
        className={`
            absolute
            left-10
            w-[150px]
            h-[500px]
            mt-[10px]
            grid
            place-items-center
            bg-arrow-background
            bg-gradient-to-r from-[20%] from-primary
          `}
      >
        <SliderArrow className='rotate-180 fill-[#969696]'/>
      </div>
      <section
        ref={sliderRef}
        className='
            flex
            gap-10
            overflow-hidden
            py-[10px]
            h-[500px]
            scroll-smooth
          '
      >
        {
          data?.map((movie: IMovie, key: number) => <MovieCard info={movie} key={key} last={key === data.length - 1 && true} />)
        }
      </section>
      <div
        ref={rightArrowRef}
        onClick={() => handleSlider('right')}
        className={`
            absolute
            top-[50px]
            right-10
            w-[150px]
            h-[500px]
            grid
            place-items-center
            bg-arrow-background
            bg-gradient-to-l from-[20%] from-primary
          `}
      >
        <SliderArrow className='fill-[#969696]'/>
      </div>
    </section>
  );
};