// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/free-mode'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination'

import './styles.css'

// eslint-disable-next-line import/no-unresolved
import { FreeMode, Pagination } from 'swiper'
import { Category } from 'src/types/category.type'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import classNames from 'classnames'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
export default function SlideShowCategory({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  return (
    <>
      <Swiper slidesPerView={4} spaceBetween={5} modules={[FreeMode, Pagination]} className='pl-2 capitalize'>
        {categories &&
          categories.map((item, index) => {
            const isActive = category === item._id
            return (
              <SwiperSlide
                key={index}
                className={classNames('text-xs', {
                  'font-semibold text-orange': isActive
                })}
              >
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: item._id
                    }).toString()
                  }}
                  // className={classNames('relative px-2', {
                  //   'font-semibold text-orange': isActive
                  // })}
                >
                  {item.name}
                </Link>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </>
  )
}
