import { Link, useParams } from 'react-router-dom'
import { generateURLName, getBlogId } from 'src/utils/FuncFormat'
import { useQuery } from '@tanstack/react-query'
import path from 'src/constants/path'
import blogApi from 'src/apis/blog.api'
import DOMPurify from 'dompurify'
import useBlogsQuery from 'src/hooks/useQueryBlog'

export default function BlogDetail() {
  const { blogDetail } = useParams()
  const id = getBlogId(blogDetail as string)
  const { data: BlogDetail } = useQuery({
    queryKey: ['BlogDetail', id],
    queryFn: () => blogApi.getBlogDetail(id as string)
  })
  const resBlogDetail = BlogDetail && BlogDetail.data
  const resBlogTitle = resBlogDetail && resBlogDetail.categoriesBlog && resBlogDetail.categoriesBlog._id

  // console.log(resBlogTitle)
  const { data: Blogs } = useBlogsQuery(resBlogTitle)
  const resBlog = Blogs && Blogs.data

  return (
    <div className='mx-auto max-w-screen-2xl px-6'>
      {resBlogDetail && (
        <main className='mt-10'>
          <nav className='my-2 flex' aria-label='Breadcrumb'>
            <ol className='inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2'>
              <li className='inline-flex items-center'>
                <Link
                  to={path.home}
                  className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
                >
                  <svg
                    className='mb-1 me-2.5 ml-2 h-3 w-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className='flex items-center'>
                  <svg
                    className='mx-1 h-3 w-3 text-gray-400 rtl:rotate-180'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='m1 9 4-4-4-4'
                    />
                  </svg>
                  <Link
                    to={path.blog}
                    className='ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ms-2'
                  >
                    Tin Tức
                  </Link>
                </div>
              </li>
              <li aria-current='page'>
                <div className='flex items-center'>
                  <svg
                    className='mx-1 h-3 w-3 text-gray-400 rtl:rotate-180'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='m1 9 4-4-4-4'
                    />
                  </svg>
                  <span className='ms-1 text-sm font-medium capitalize text-gray-500 dark:text-gray-400 md:ms-2'>
                    {resBlogDetail.categoriesBlog?.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <div className='relative mx-auto w-full md:mb-0'>
            <div className='px-4 lg:px-0'>
              <h2 className='text-3xl font-semibold capitalize leading-tight text-gray-800 md:text-3xl lg:text-4xl'>
                {resBlogDetail.title}
              </h2>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row lg:space-x-12'>
            <div className='mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:w-8/12 lg:px-0'>
              <i className='mb-4 font-semibold text-indigo-400 '>{resBlogDetail.publishDate}</i>
              {/* truyển Blog dạng html sang văn bản */}
              <p className='pb-6' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resBlogDetail.contentHTML) }} />
            </div>
            <div className='m-auto mt-12 w-full max-w-screen-sm lg:w-4/12'>
              <div className='flex py-2'>
                {/* <img src="https://randomuser.me/api/portraits/men/97.jpg" className="mr-2 h-10 w-10 rounded-full object-cover" /> */}

                <p className='text-2xl font-semibold text-gray-700'> Bài Viết Liên Quan </p>
              </div>
              <div className='py-3 text-gray-700'>
                <div className='w-full rounded-lg border border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'>
                  {resBlog &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    resBlog.map((item: any) => (
                      <button
                        key={item._id}
                        type='button'
                        className='relative inline-flex w-full items-center rounded-t-lg border-b border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500'
                      >
                        <div className='group relative flex'>
                          <img
                            src={item.img.path}
                            alt={item.title}
                            className='mr-2 mt-4 h-16 w-16 items-center justify-center bg-gray-50'
                          />
                          <div className=''>
                            <p className='mt-3 font-sans text-lg leading-relaxed text-gray-900 group-hover:text-gray-600'>
                              <Link to={`${path.blog}/${generateURLName({ name: item.title, id: item._id })}`}>
                                <span className='absolute inset-0' />
                                {item.title}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
