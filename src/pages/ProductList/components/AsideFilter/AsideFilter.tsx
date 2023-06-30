import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema } from 'src/utils/ruleValidateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
// import InputV2 from 'src/components/InputV2(New)'
import RatingStarts from 'src/components/RatingStarts'
interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = {
  price_min: string
  price_max: string
}

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })
  const hanldeRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'category'])).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-start justify-start'>
        <svg
          viewBox='0 0 12 10'
          className='mr-1 h-3 w-3 flex-shrink-0 fill-current md:mr-2 md:h-5 md:w-5 lg:mr-2 lg:h-5 lg:w-5'
        >
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span className='mt-1 flex-shrink-0 text-[8px] font-bold  capitalize md:text-sm lg:text-[16px]'>
          Tất Cả Danh Mục
        </span>
      </Link>
      <div className='my-2 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='md:py-2 lg:py-4 ' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg
                    viewBox='0 0 4 7'
                    className='absolute left-[0px] top-2 h-1 w-1 fill-orange md:left-[-4px] md:top-1 md:h-3 md:w-3 lg:left-[-8px] lg:top-0 lg:h-3 lg:w-3'
                  >
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                <span className=' text-[8px] capitalize md:text-sm lg:text-[16px] '>{categoryItem.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='mt-4 flex items-start justify-start '>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-1 h-3 w-3 flex-shrink-0 fill-current stroke-current md:mr-2 md:h-5 md:w-5 lg:mr-2 lg:h-5 lg:w-5'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        <span className='flex-shrink-0 text-[8px] font-bold capitalize md:text-sm lg:text-[16px]'>bộ lọc tìm kiếm</span>
      </div>
      <div className='my-5'>
        <div className='flex-shrink-0 text-[8px] font-bold capitalize md:my-2 md:text-sm lg:my-4 lg:text-[16px]'>
          Khoảng giá
        </div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex flex-col items-center justify-center md:flex md:flex-row lg:flex lg:flex-row '>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className=''
                    placeholder='₫ Từ'
                    autoComplete='off'
                    classNameError='hidden'
                    classNameInput='w-full rounded-sm p-1 outline-none focus:border-gray-400 focus:shadow-md shadow-sm text-[8px] md:text-sm lg:text-lg'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />

            <div className='mx-3 my-1 h-[2px] w-6 shrink-0 bg-gray-400 md:w-1' />
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className=''
                    autoComplete='off'
                    placeholder='₫ Đến'
                    classNameError='hidden'
                    classNameInput='w-full rounded-sm p-1 outline-none focus:border-gray-400 focus:shadow-md shadow-sm text-[8px] md:text-sm lg:text-lg'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1rem] text-center text-[8px] text-red-600 md:text-sm lg:text-lg'>
            {errors.price_min?.message}
          </div>
          <Button
            className='flex w-full items-center justify-center rounded-sm bg-orange px-1 py-2 text-[8px] capitalize text-white shadow-sm
          hover:bg-orange/80 md:text-sm lg:text-lg'
          >
            <span>Áp Dụng</span>
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <span className='flex-shrink-0 text-[8px] font-bold capitalize md:text-sm lg:text-lg'>Áp Dụng</span>
      <RatingStarts queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        className='flex w-full items-center justify-center rounded-sm bg-orange px-1 py-2 text-[8px] capitalize text-white shadow-sm
        hover:bg-orange/80 md:text-sm lg:text-lg'
        onClick={hanldeRemoveAll}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
