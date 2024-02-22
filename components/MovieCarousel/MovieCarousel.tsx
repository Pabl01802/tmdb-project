import React, { useEffect, useRef, useState } from 'react';
import { SliderArrow } from "@/images/sliderArrow";
import { IMovie } from "@/interfaces/interfaces";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { IMovieCarouselProps } from '@/interfaces/interfaces'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

export const MovieCarousel = ({ data }:IMovieCarouselProps) => {

  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [lastElement, setLastElement] = useState<HTMLDivElement>(undefined!)

  const sliderRef = useRef<HTMLDivElement>(null)
  const rightArrowRef = useRef<HTMLDivElement>(null)
  const leftArrowRef = useRef<HTMLDivElement>(null)


  const handleWindowResize = () => {
    if(scrollPosition !== ScrollTrigger.maxScroll(sliderRef.current!, true)){
      rightArrowRef.current!.style.display = 'flex'
    }
    if(scrollPosition === ScrollTrigger.maxScroll(sliderRef.current!, true) && rightArrowRef.current!.style.display !== 'none'){
      rightArrowRef.current!.style.display = 'none'
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    lastElement && (window.addEventListener('resize', () => {
      const isInViewport:boolean = ScrollTrigger.isInViewport(lastElement, 1, true)
      isInViewport && (rightArrowRef.current!.style.display = 'none')
    }))
  }, [lastElement]);

  useEffect(() => {
    const maxScroll = ScrollTrigger.maxScroll(sliderRef.current!, true)
    if(maxScroll > 0 && scrollPosition === maxScroll){
      rightArrowRef.current!.style.display = 'none'
    }else{
      rightArrowRef.current!.style.display = 'flex'
    }
    if(scrollPosition <= 0){
      leftArrowRef.current!.style.display = 'none'
    }else{
      leftArrowRef.current!.style.display = 'flex'
    }
  }, [scrollPosition]);

  const handleSlider = (direction:string) => {
    let scrollValue:number = 550
    const maxScroll = ScrollTrigger.maxScroll(sliderRef.current!, true)
    if(direction === 'right'){
      gsap.to(sliderRef.current, {
        duration: 1,
        scrollTo: { x: scrollPosition + scrollValue }
      })
      if(scrollPosition + scrollValue > maxScroll) setScrollPosition(maxScroll)
      else setScrollPosition(prev => prev + scrollValue)
    }
    if(direction === 'left' || rightArrowRef.current!.style.display === 'none'){
      gsap.to(sliderRef.current, {
        duration: 1,
        scrollTo: { x: scrollPosition - scrollValue },
      })
      setScrollPosition(prev => prev - scrollValue)
    }
  }

  const handleLastElement = (el?:HTMLDivElement) => setLastElement(el as HTMLDivElement)

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
          data?.map((movie: IMovie, key: number) => <MovieCard info={movie} key={key} last={key === data.length - 1 && true} setElement={key === data.length - 1 ? setLastElement : undefined!} />)
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