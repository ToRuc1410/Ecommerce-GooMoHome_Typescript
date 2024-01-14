import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Schema, schema } from 'src/utils/ruleValidateForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import purchasesAPI from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
interface Props {
  orderId: string
  onHide: () => void // Thêm prop onHide để ẩn component
}

type FormData = Pick<Schema, 'option'>
const perchasesSchema = schema.pick(['option'])
export default function Modal({ orderId, onHide }: Props) {
  const deleteOrderMutation = useMutation({
    mutationFn: purchasesAPI.deleteOrderPurchase,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err.response.data.message, {
        position: 'top-center',
        autoClose: 5000
      })
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(perchasesSchema)
  })

  const hanldeEvent = handleSubmit(async (dataForm) => {
    const resDeleteOrder = await deleteOrderMutation.mutateAsync({
      orderDetail_id: orderId,
      message: dataForm.option
    })
    if (resDeleteOrder) {
      onHide()
    }
  })
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
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                    </div>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
                        Hủy Đơn Hàng
                      </Dialog.Title>
                      <div className='mt-2'>
                        <form onSubmit={hanldeEvent}>
                          {/* Danh sách các input radio */}
                          <div className='flex flex-col'>
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
                          </div>
                          {/* Hiển thị lỗi nếu có */}
                          {errors.option && (
                            <span className='text-[8px] text-red-500 md:text-sm lg:text-sm'>
                              {errors.option?.message}
                            </span>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                    onClick={hanldeEvent}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
