// // Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import YouTube, { YouTubeProps } from 'react-youtube'
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
import { useEffect, useState } from 'react'

interface Props {
  autoplayDelay?: number
}
interface WindowSize {
  width: number
  height: number
}
export default function SlideShow({ autoplayDelay = 2500 }: Props) {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getVideoWidth = (): string => {
    return windowSize.width < 540 ? '200' : '540'
  }

  const getVideoHeight = (): string => {
    return windowSize.width < 540 ? '100' : '290'
  }

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const opts: YouTubeProps['opts'] = {
    height: getVideoHeight(),
    width: getVideoWidth(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }
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
            src='https://res.cloudinary.com/drcutfii2/image/upload/c_crop,h_5000,w_5000/v1716801932/users/z5481201360714_1e26c334c8f267c1af4494bb8bdced21_ieprr1.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://res.cloudinary.com/drcutfii2/image/upload/c_crop,h_5000,w_5000/v1688100239/users/i1a1dulacbwwdz2r3epu.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://res.cloudinary.com/drcutfii2/image/upload/c_crop,h_5000,w_5000/v1716801931/users/z4422668645962_d0fa0ba95cdbbcd9106d379ed4bf689a_zcvohl.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://res.cloudinary.com/drcutfii2/image/upload/c_crop,h_5000,w_5000/v1716801932/users/z4622947362615_fb413371f6dd196a4835d22444f4cfed_urp4pu.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://res.cloudinary.com/drcutfii2/image/upload/c_crop,h_5000,w_5000/v1716801932/users/z4597780760304_0ea84ec7f6077f7dcfe35e2fa4e1d01e_bxfyyt.jpg'
            alt=''
            className='h-50% w-full object-cover'
          />
        </SwiperSlide>
        {/* <video className='h-full w-full rounded-lg' controls autoPlay muted>
          <source src='https://youtu.be/kfu8h1VFQKs' type='video/mp4' />
          Your browser does not support the video tag.
        </video> */}
        {/* <div className='autoplay-progress' slot='container-end'>
          <YouTube videoId='kfu8h1VFQKs' opts={opts} onReady={onPlayerReady} />
        </div> */}
      </Swiper>
    </>
  )
}
