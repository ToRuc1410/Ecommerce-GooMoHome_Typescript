import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema } from 'src/utils/ruleValidateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import RatingStarts from 'src/components/RatingStarts'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import InputV2 from 'src/components/InputV2(New)'

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
  // exclude?: string | undefined;
  // name?: string | undefined;

  // sort
  // page?: string | undefined;
  // limit?: string | undefined;
  // sort_by?: string | undefined;
  // order?: string | undefined;

  // filter
  // rating_filter?: string | undefined;
  // price_min?: string | undefined;
  // price_max?: string | undefined;
  // category?: string | undefined;
  const hanldeRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['rating_filter', 'price_min', 'price_max', 'category'])).toString()
    })
  }
  return (
    <div className='m-3 py-4'>
      <Link to={path.home} className='flex items-start font-bold capitalize'>
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
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
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2 ', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                <span className='text-sm'> {categoryItem.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='mt-4 flex items-start font-bold uppercase '>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-5 w-3 fill-current stroke-current'
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
        bộ lọc tìm kiếm
      </div>
      <div className='my-5'>
        <div className='capitalize'>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex justify-start'>
            {/* <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ TỪ'
                    autoComplete='off'
                    classNameError='hidden'
                    classNameInput='w-full rounded-sm p-1 outline-none focus:border-gray-400 focus:shadow-md shadow-sm text-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            /> */}
            <InputV2
              control={control}
              name='price_min'
              type='number'
              className='grow'
              placeholder='₫ TỪ'
              autoComplete='off'
              classNameError='hidden'
              classNameInput='w-full rounded-sm p-1 outline-none focus:border-gray-400 focus:shadow-md shadow-sm text-sm'
              onChange={() => {
                trigger('price_max')
              }}
            />
            <div className='mx-3 mt-3 h-[2px] w-3 shrink-0 bg-gray-400'></div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    autoComplete='off'
                    placeholder='₫ ĐẾN'
                    classNameError='hidden'
                    classNameInput='w-full rounded-sm p-1 outline-none focus:border-gray-400 focus:shadow-md shadow-sm text-sm'
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
          <div className='mt-1 min-h-[1rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button
            className='flex w-full items-center justify-center rounded-sm bg-orange p-2 text-sm uppercase
          text-white shadow-sm hover:bg-orange/80'
          >
            Áp Dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh Giá</div>
      <RatingStarts queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        className='flex w-full items-center justify-center rounded-sm bg-orange p-2 text-sm uppercase
          text-white shadow-sm hover:bg-orange/80'
        onClick={hanldeRemoveAll}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
