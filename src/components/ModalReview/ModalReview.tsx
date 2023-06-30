import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useMutation } from '@tanstack/react-query'
import purchasesAPI from 'src/apis/purchase.api'
import { Rating } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { isAxiosStatusCodeError } from 'src/utils/utilsErrForm'
import { ErrorResponse } from 'src/types/utils.type'

interface Props {
  orderId: string
  onHide: () => void // Thêm prop onHide để ẩn component
}

export default function ModalReview({ orderId, onHide }: Props) {
  const initStates = () => ({
    material: '',
    description: '',
    message: ''
  })
  const [rating, setRating] = useState(5)
  const [stateProducts, setStateProducts] = useState(initStates())
  const orderReviewMutation = useMutation({
    mutationFn: purchasesAPI.orderReview
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setStateProducts({ ...stateProducts, [name]: value })
  }
  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hanldeEvent = async (e: any) => {
    try {
      e.preventDefault()
      console.log(stateProducts, rating)
      const resOrderReview = await orderReviewMutation.mutateAsync({
        orderDetail_id: orderId,
        material: stateProducts.material || '',
        description: stateProducts.description || '',
        message: stateProducts.message || '',
        rating: rating
      })
      if (resOrderReview) {
        toast.success(' Cám ơn bạn đã đánh giá sản phẩm... ')
        onHide()
      }
    } catch (error) {
      // eslint-disable-next-line prettier/prettier
      if (isAxiosStatusCodeError<ErrorResponse<string>>(error)) toast.error(error.response?.data.message)
      onHide()
    }
  }
  const hanldeCanCel = () => {
    onHide()
    setOpen(false)
  }
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={!open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <form onSubmit={hanldeEvent}>
                  <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-50 sm:mx-0 sm:h-10 sm:w-10'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-6 w-6 text-yellow-600'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z'
                          />
                        </svg>
                      </div>
                      <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                        <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
                          Đánh Giá Đơn Hàng
                        </Dialog.Title>
                        <div className='flex items-center px-4 py-2 text-yellow-500 lg:justify-between'>
                          <span className='mr-2 text-xs md:text-sm lg:mr-5 lg:text-sm'>Chất Lượng Sản Phẩm</span>
                          <Rating value={rating} onChange={handleRatingChange} />
                        </div>
                        <div className='flex flex-col'>
                          <span>Chất Liệu: </span>
                          <input
                            className='mt-2 bg-gray-100 px-3 py-4 text-[8px] md:text-sm lg:text-sm'
                            placeholder='Để lại đánh giá'
                            name='material'
                            value={stateProducts.material}
                            onChange={handleInputChange}
                          />
                          <span className='py-1'>Đúng với mô tả: </span>
                          <input
                            className='mt-2 bg-gray-100 px-3 py-4 text-[8px] md:text-sm lg:text-sm'
                            name='description'
                            placeholder='Mô tả về đơn hàng'
                            value={stateProducts.description}
                            onChange={handleInputChange}
                          />
                          <span className='py-1'>Chia Sẻ Thêm Về Sản Phẩm: </span>
                          <input
                            className='mt-2 bg-gray-100 px-3 py-4 text-[8px] md:text-sm lg:text-sm'
                            name='message'
                            placeholder='Cảm nhận của bạn về sản phẩm'
                            value={stateProducts.message}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Danh sách các input radio */}
                        {/* <div className='flex flex-col'>
                          <label className='my-2'>
                            <input type='radio' value='Đổi ý, Không Muốn mua nữa' {...register('option')} />
                            <span className='ml-2 capitalize'>Đổi ý, Không Muốn mua nữa</span>
                          </label>
                          <label className='my-2'>
                            <input type='radio' value='Muốn Thay Đổi Lại Thông Tin' {...register('option')} />
                            <span className='ml-2 capitalize'>Muốn Thay Đổi Lại Thông Tin</span>
                          </label>
                          <label className='my-2'>
                            <input type='radio' value='Khác' {...register('option')} />
                            <span className='ml-2 '>Khác</span>
                          </label>
                        </div> */}
                        {/* Hiển thị lỗi nếu có */}
                        {/* {errors.option && (
                          <span className='text-[8px] text-red-500 md:text-sm lg:text-sm'>
                            {errors.option?.message}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button
                      type='submit'
                      className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                    >
                      Đồng Ý
                    </button>
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                      onClick={hanldeCanCel}
                      ref={cancelButtonRef}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
