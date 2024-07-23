import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import blogApi from 'src/apis/blog.api'
import path from 'src/constants/path'
import useBlogsQuery from 'src/hooks/useQueryBlog'
import { generateURLName } from 'src/utils/FuncFormat'

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('')

  // Get All categoryBlogs
  const { data: categoryBlogs } = useQuery({
    queryKey: ['categoryBlogs'],
    queryFn: () => {
      return blogApi.getCategoriesBlogs()
    }
  })
  const { data: Blogs } = useBlogsQuery(selectedCategory)
  const resCategoryBlogs = categoryBlogs?.data
  const blogs = Blogs?.data

  return (
    <div className='bg-white py-10'>
      <div className=' mx-auto max-w-7xl px-6 '>
        <div className='mx-auto max-w-full lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Tin Tức</h2>
          <div className='flex w-full flex-wrap justify-evenly'>
            <button
              className={classNames(
                'relative z-10 my-2 h-12 w-1/4 rounded-xl p-4 px-3 py-1.5 text-xs font-medium capitalize text-gray-600 lg:mx-2 lg:h-16 lg:w-1/6 lg:text-sm',
                {
                  'bg-blue-500  text-white transition duration-300 hover:bg-blue-800': selectedCategory === ''
                }
              )}
              onClick={() => setSelectedCategory('')}
            >
              Tất Cả
            </button>
            {resCategoryBlogs &&
              resCategoryBlogs.map((item) => (
                <button
                  key={item._id}
                  className={classNames(
                    'relative z-10 my-2 h-12 w-1/4 rounded-xl p-4 px-3 py-1.5 text-xs font-medium capitalize text-gray-600 lg:mx-2 lg:h-16 lg:w-1/6 lg:text-sm',
                    {
                      'bg-blue-500  text-white transition duration-300 hover:bg-blue-800': selectedCategory === item._id
                    }
                  )}
                  onClick={() => setSelectedCategory(item._id)}
                >
                  {item.title}
                </button>
              ))}
          </div>
        </div>
        <div className='mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {blogs && blogs.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            blogs.map((post: any) => (
              <article key={post._id} className='flex flex-col items-start justify-start '>
                <div className='flex items-center gap-x-4 text-xs'>
                  <time dateTime={post.publishDate} className='text-sm font-semibold text-blue-800'>
                    {post.publishDate}
                  </time>
                  <span className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100'>
                    {post.categoriesBlog.title}
                  </span>
                </div>
                <div className='group relative flex'>
                  <img src={post.img.path} alt='' className='mr-2 h-20 w-20 items-start  justify-start bg-gray-50' />
                  <div className='max-w-xs'>
                    <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                      <Link to={`${path.blog}/${generateURLName({ name: post.title, id: post._id })}`}>
                        <span className='absolute inset-0' />
                        {post.title}
                      </Link>
                      {/* <a href={`${generateURLName({ name: post.title, id: post._id })}`}></a> */}
                    </h3>
                    <p className=' mt-2 line-clamp-3  text-sm leading-6 text-gray-600'>{post.contentText}</p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className=''>
              <span className='rounded-full bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 lg:text-base'>
                Hiện tại chưa có tin tức mới cho Danh Mục này
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
