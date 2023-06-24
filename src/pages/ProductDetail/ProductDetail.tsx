import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import { toast } from 'react-toastify'
import ProductRating from 'src/components/ProductRating'
import { Product, ProductConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromURLNameAndId } from 'src/utils/FuncFormat'
import { rateSale } from 'src/utils/rateSale'
import ProductItems from '../ProductList/components/ProductItems'
import QuantityProduct from 'src/components/QuantityProduct'
import purchasesAPI from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchaseStatus'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export default function ProductDetail() {
  const { isAuthenticated } = useContext(AppContext)
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromURLNameAndId(nameId as string)
  const navigate = useNavigate()
  const { data: ProductDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImgs, setCurrentIndexImgs] = useState([0, 5])
  const [activeImg, setActiveImg] = useState('')
  const queryClient = useQueryClient()
  const imgRef = useRef<HTMLImageElement>(null)
  const product = ProductDetailData?.data.data
  const currentImgs = useMemo(
    () => (product ? product.images.slice(...currentIndexImgs) : []),
    [currentIndexImgs, product]
  )

  // get All Products
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const category = product?.category as any
  const queryConfig: ProductConfig = {
    category: category
  }
  const { data: ProductsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    // khi product có data thì mới cho gọi useQuery này
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const postProductViewMutations = useMutation(productApi.postProductView)
  useEffect(() => {
    // Gửi yêu cầu tăng số lượt xem khi component được tạo

    try {
      postProductViewMutations.mutate(
        { id: id },
        {
          onSuccess: (data) => {
            console.log(data)
          }
        }
      )
    } catch (error) {
      console.error('Lỗi khi tăng số lượt xem:', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // post Api Product_id and buy_count
  const addToCartMutations = useMutation(purchasesAPI.addToCart)

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImg(product.images[0])
    }
  }, [product])

  const chooseActive = (img: string) => {
    setActiveImg(img)
  }

  const next = () => {
    if (currentIndexImgs[1] < (product as Product).images.length) {
      setCurrentIndexImgs((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImgs[0] > 0) {
      setCurrentIndexImgs((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const hanldeChangeImg = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const img = imgRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    img.style.maxWidth = 'unset'
    img.style.width = naturalWidth + 'px'
    img.style.height = naturalHeight + 'px'
    img.style.top = top + 'px'
    img.style.left = left + 'px'
  }
  const hanldeRemoveStyleImg = () => {
    imgRef.current?.removeAttribute('style')
  }

  const addToCart = () => {
    if (isAuthenticated) {
      addToCartMutations.mutate(
        { buy_count: buyCount, product_id: product?._id as string },
        {
          onSuccess: (data) => {
            toast.success(data.data.message, { position: 'top-center', autoClose: 2000 })
            //queryClient.invalidateQueries được sử dụng để làm mới lại (invalidate) các truy vấn đã được lưu trữ trong queryClient.
            queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
          }
        }
      )
    } else {
      toast.error('Bạn vui lòng đăng nhập trước khi mua hàng', {
        position: 'top-center',
        autoClose: 3000
      })
      navigate(path.login)
      // setDataPurchasesFromLS({ buy_count: buyCount, product: product as Product })
      // console.log(getDataPurchasesFromLS())
    }
  }

  const buyNow = async () => {
    if (isAuthenticated) {
      const res = await addToCartMutations.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
      const purchase = res.data.data
      navigate(path.cart, {
        state: {
          purchaseId: purchase._id
        }
      })
    } else {
      toast.error('Bạn vui lòng đăng nhập trước khi mua hàng', {
        position: 'top-center',
        autoClose: 3000
      })
      navigate(path.login)
    }
  }
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='rounded-sm bg-white p-4 shadow-sm'>
          <div className='grid grid-cols-12 gap-2'>
            {/* img */}
            <div className='col-span-6'>
              {/* img chính */}
              <div className='container'>
                <div
                  className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow-sm'
                  onMouseMove={hanldeChangeImg}
                  onMouseLeave={hanldeRemoveStyleImg}
                >
                  <img
                    src={activeImg || product.image}
                    alt={product.name}
                    className='pointer-events-none absolute left-0 top-0 h-full w-full rounded-sm bg-white object-cover outline-none'
                    ref={imgRef}
                  />
                </div>
                {/* img phụ */}
                <div className='relative mt-4 grid grid-cols-5 gap-1 '>
                  <button
                    className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={prev}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                  </button>
                  {currentImgs.slice(0, 5).map((img, index) => {
                    const isActive = img === activeImg
                    return (
                      <div
                        className='relative w-full pt-[100%]'
                        key={index}
                        onMouseEnter={() => {
                          chooseActive(img)
                        }}
                      >
                        <img
                          src={img}
                          alt={product.name}
                          className='absolute left-0 top-0 h-full w-full rounded-sm bg-white object-cover'
                        />
                        {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                      </div>
                    )
                  })}
                  <button
                    className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={next}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className=' col-span-1 mx-12 w-[2px] bg-slate-50' /> */}
            {/* choose thuộc tính */}
            <div className='col-span-6 '>
              {/* - Title */}
              <h1 className='text-sm font-medium sm:text-xl lg:text-2xl'>{product.name}</h1>
              <div className='mt-2 flex items-center bg-slate-50 p-2 text-[8px] capitalize md:text-sm lg:text-lg'>
                <div className='flex items-center '>
                  <span className='mr-1 border-b border-gray-500'>{product.rating}</span>
                  <span>
                    <ProductRating
                      rating={product.rating || 0}
                      activeClassName='fill-orange text-orange h-2 w-2 lg:h-5 md:h-3 lg:w-5 md:w-3'
                      noneActiveClassName='fill-gray-300 text-gray-300 h-2 w-2 lg:h-5 md:h-3 lg:w-5 md:w-3'
                    />
                  </span>
                </div>
                <div className=' mx-2 h-4 w-[1px] bg-gray-400 lg:mx-4' />
                <div>
                  <p className=' text-gray-500'>{formatNumberToSocialStyle(product.sold || 0)} Đã bán</p>
                </div>
              </div>
              {/* Giá */}
              <div className='mt-3 flex-shrink-0 flex-col items-center bg-gray-100 px-1 py-2 lg:pl-3'>
                {product.price !== 0 && (
                  <div className='mb-1 w-6 rounded-sm bg-orange p-1 text-[4px] text-white/80 md:w-8 md:text-[6px] lg:w-16 lg:text-xs'>
                    {rateSale(product.price_before_discount, product.price)}
                    <span> giảm</span>
                  </div>
                )}
                <div className='flex'>
                  {product.price === 0 ? (
                    <></>
                  ) : (
                    <div className='text-[8px] text-gray-500 line-through md:text-sm lg:pt-2 lg:text-lg'>
                      <span>₫</span>
                      <span>{formatCurrency(product.price_before_discount)}</span>
                    </div>
                  )}
                  <div className='mx-1 font-sans text-[10px] text-orange md:mx-2 md:text-[18px] lg:ml-4 lg:pb-2 lg:text-3xl'>
                    <span>₫</span>
                    <span>{formatCurrency(product.price !== 0 ? product.price : product.price_before_discount)}</span>
                  </div>
                </div>
              </div>
              <div className='mt-2 flex items-center justify-start text-[8px] capitalize md:text-sm lg:text-lg'>
                <div className='capitalize text-gray-500 '>Số lượng</div>
                <QuantityProduct
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                  classWrapper='px-1 py-2'
                />
                <div className='text-gray-600'>{product.quantity} Số lượng có sẵn</div>
              </div>
              <div className='mt-2 flex items-center py-2 text-[7px] md:text-sm lg:text-lg'>
                <button
                  className='flex h-5 items-center justify-center rounded-sm  bg-slate-200 p-2 capitalize text-orange hover:bg-slate-300 hover:shadow-lg md:p-5 lg:p-7'
                  onClick={addToCart}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                    />
                  </svg>
                  thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='ml-2 flex h-5 items-center justify-center rounded-sm bg-orange px-3 capitalize text-white outline-none hover:bg-orange/80 hover:shadow-lg md:p-5 lg:p-7'
                >
                  Mua ngay
                </button>
              </div>

              <div className='py-2 text-[10px] md:text-sm lg:text-sm'>
                <span className='font-bold uppercase lg:ml-12'>Chi Tiết Đơn Hàng</span>
                <div className='py-2'>
                  <div className='py-1'>Dài x Rộng: {`${product.length}cm x ${product.width}cm `}</div>
                  <div className='py-1'>Cao: {product.height}cm</div>
                  <div className='py-1'>Nặng: {product.weight}gram</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 bg-white p-4 shadow'>
        <div className='container'>
          <div className='rounded bg-gray-100 p-4 text-[10px] capitalize text-slate-700 md:text-sm lg:text-lg'>
            Mô tả sản phẩm
          </div>
          <div className='mx-4 mb-4 mt-4 text-[10px] md:mt-6 md:text-sm lg:mt-8 lg:text-sm'>
            {/* truyển description dạng html sang văn bản */}
            <div
              className='leading-loose'
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.descriptionHTML) }}
            />
          </div>
        </div>
      </div>
      <div className='mt-4 md:mt-6 lg:mt-8 '>
        <div className='container'>
          <div className='rounded bg-gray-100 p-4 text-[10px] capitalize text-slate-700 md:text-sm lg:text-lg'>
            có thể bạn cũng thích
          </div>
          {ProductsData && (
            <div className='mt-2 grid grid-cols-3 gap-1 md:mt-4 md:grid-cols-4 lg:mt-6 lg:grid-cols-5 lg:gap-3 xl:grid-cols-6'>
              {ProductsData.data.data.products.map((items) => (
                <div className='col-span-1' key={items._id}>
                  <ProductItems product={items} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
