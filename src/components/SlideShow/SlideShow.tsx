// Import Swiper React components
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
