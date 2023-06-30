import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation'
import './styles.css'
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper'

interface Props {
  autoplayDelay?: number
}

export default function SlideShow({ autoplayDelay = 2500 }: Props) {
  // const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {

  // }
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className='mySwiper'
      >
        {/* {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))} */}

        <SwiperSlide>
          <img
            src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YbNbPPqn2EfwxjP7/z3205596566056_089_432ed8e0b4973b338f4e30567d5a1134-1-mjEzXGDBp9CyRRaD.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YbNbPPqn2EfwxjP7/baopsng-ma-u-mae-i-ssss-YNqDl2Lrr0t54WLP.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YbNbPPqn2EfwxjP7/z4258445939932_3a35470eeffcd1ca2ce4f4e8bfc63028-AGBroO567vFvgnBm.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YbNbPPqn2EfwxjP7/z4258446382878_3a50cbde2734408b54ab8abd440fdb59-dJoGrjn686F9gG6J.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YbNbPPqn2EfwxjP7/z4258445932549_6499cc954a83cd75d05aa5d702b892fd-A1agL4GwrEsG5QGl.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>

        <div className='autoplay-progress' slot='container-end'>
          {/* <svg viewBox='0 0 48 48' ref={progressCircle}>
            <circle cx='24' cy='24' r='20'></circle>
          </svg> */}
        </div>
      </Swiper>
    </>
  )
}
