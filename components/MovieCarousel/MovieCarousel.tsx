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
  const [scrollValue, setScrollValue] = useState<number>(560)

  const sliderRef = useRef<HTMLDivElement>(null)
  const rightArrowRef = useRef<HTMLDivElement>(null)
  const leftArrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    window.addEventListener('resize', handleArrowsWindowResize);
    if(window.innerWidth < 1200) setScrollValue(180 * 1.3)
    return () => {
      window.removeEventListener('resize', handleArrowsWindowResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleScrollWindowResize)
    return () => {
      window.removeEventListener('resize', handleScrollWindowResize);
    };
  }, [lastElement]);

  const handleArrowsWindowResize = () => {
    const maxScroll = ScrollTrigger.maxScroll(sliderRef.current!, true)
    if(scrollPosition !== maxScroll){
      rightArrowRef.current!.style.display = 'grid'
    }
    if(scrollPosition === maxScroll && rightArrowRef.current!.style.display !== 'none'){
      rightArrowRef.current!.style.display = 'none'
    }
    if(maxScroll <= window.innerWidth){
      rightArrowRef.current!.style.display = 'none'
    }else{
      rightArrowRef.current!.style.display = 'grid'
    }
  }

  const handleScrollWindowResize = () => {
    if(window.innerWidth < 1200){
      setScrollValue(lastElement.offsetWidth * 1.3)
    }
  }

  useEffect(() => {
    if(lastElement){
      ScrollTrigger.isInViewport(lastElement, 1, true) && (rightArrowRef.current!.style.display = 'none')
      window.addEventListener('resize', () => {
        const isLastInViewport:boolean = ScrollTrigger.isInViewport(lastElement, 1, true)
        isLastInViewport ? (rightArrowRef.current!.style.display = 'none') : (rightArrowRef.current!.style.display = 'grid')
      })
    }
  }, [lastElement]);

  useEffect(() => {
    const maxScroll = ScrollTrigger.maxScroll(sliderRef.current!, true)
    if(maxScroll > 0 && scrollPosition === maxScroll){
      rightArrowRef.current!.style.display = 'none'
    }else{
      rightArrowRef.current!.style.display = 'grid'
    }
    if(scrollPosition <= 0){
      leftArrowRef.current!.style.display = 'none'
    }else{
      leftArrowRef.current!.style.display = 'grid'
    }
    if(lastElement) {
      ScrollTrigger.isInViewport(lastElement, 1, true) && (rightArrowRef.current!.style.display = 'none')
    }
  }, [scrollPosition]);

  const handleSlider = (direction:string) => {
    // let scrollValue:number = 550
    const maxScroll = ScrollTrigger.maxScroll(sliderRef.current!, true)
    if(direction === 'right'){
      gsap.to(sliderRef.current, {
        x: scrollPosition + scrollValue < maxScroll ? -(scrollPosition + scrollValue) : -maxScroll,
        duration: 1
      })
      if(scrollPosition + scrollValue > maxScroll) setScrollPosition(maxScroll)
      else setScrollPosition(prev => prev + scrollValue)
    }
    if(direction === 'left' || rightArrowRef.current!.style.display === 'none'){
      gsap.to(sliderRef.current, {
        x: scrollPosition - scrollValue > 0 ? scrollValue - scrollPosition : 0,
        duration: 1,
        onUpdate: () => {
          ScrollTrigger.isInViewport(lastElement, 1, true)
            ? (rightArrowRef.current!.style.display = 'none')
            : (rightArrowRef.current!.style.display = 'grid')
        }
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
          overflow-hidden

          small:h-[400px]

          xs:h-[400px]
        '
    >
      <div
        ref={leftArrowRef}
        onClick={() => handleSlider('left')}
        className={`
            absolute
            left-0
            w-[150px]
            h-[500px]
            grid
            place-items-center
            bg-arrow-background
            bg-gradient-to-r from-[40%] from-primary
            z-20
            
            small:h-[366px]
            small:top-[25px]
            
            xs:h-[366px]
            xs:top-[25px]
            xs:w-[80px]
            `}
      >
        <SliderArrow className='rotate-180 fill-[#969696]'/>
      </div>
      <section
        ref={sliderRef}
        className='
            flex
            gap-10
            py-[10px]
            scroll-smooth
          '
      >
        {
          data?.map((movie: IMovie, key: number) => <MovieCard info={movie} key={key} last={key === data.length - 1 && true} setLastCard={key === data.length - 1 ? setLastElement : undefined!} />)
        }
      </section>
      <div
        ref={rightArrowRef}
        onClick={() => handleSlider('right')}
        className={`
            absolute
            top-[40px]
            right-0
            w-[150px]
            h-[500px]
            grid
            place-items-center
            bg-arrow-background
            bg-gradient-to-l from-[40%] from-primary
            
            small:h-[366px]
            small:top-[30px]
            
            xs:h-[366px]
            xs:top-[30px]
            xs:w-[80px]
          `}
      >
        <SliderArrow className='fill-[#969696]'/>
      </div>
    </section>
  );
};