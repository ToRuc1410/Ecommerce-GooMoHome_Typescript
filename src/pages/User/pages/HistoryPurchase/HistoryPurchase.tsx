import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import purchasesAPI from 'src/apis/purchase.api'
import Modal from 'src/components/Modal'
import ModalReview from 'src/components/ModalReview'
import path from 'src/constants/path'
import { detailStatus } from 'src/constants/purchaseStatus'
import useQueryParams from 'src/hooks/useQueryParams'
import { OrderDetailListStatus } from 'src/types/purchase.type'
import { formatCurrency } from 'src/utils/FuncFormat'
import { renderColorStatusCode, renderDate, renderStatusCode } from 'src/utils/renderStatusCode'

const purchaseTabs = [
  { status: detailStatus.all, name: 'Tất cả' },
  { status: detailStatus.waitForConfirmation, name: 'Chờ Xác Nhận' },
  { status: detailStatus.waitForGetting, name: 'Chờ Lấy Hàng' },
  { status: detailStatus.inProgress, name: 'Đang Giao' },
  { status: detailStatus.delivered, name: 'Đã Giao' },
  { status: detailStatus.cancelled, name: 'Đã Hủy' }
]

export default function HistoryPurchase() {
  const [orderId, setOrderId] = useState<string | null>(null)
  const [OrderReview, setOrderReview] = useState<string | null>(null)
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || detailStatus.all

  // gọi API lấy giỏ hàng trong Cart và phải là user đã Login || Register
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['order-detail', { status }],
    queryFn: () => purchasesAPI.orderDetailPurchase({ status: status as OrderDetailListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const updatePurchaseMutation = useMutation({
    mutationFn: purchasesAPI.deliveredOrderPurchase,
    onSuccess: () => {
      refetch()
    }
  })

  // render sideNav
  const handleDeliveredOrder = (IdPurchase: string) => () => {
    updatePurchaseMutation.mutate({ orderDetail_id: IdPurchase })
  }
  /// trạng thái xóa đơn hàng
  const handleDeleteOrder = (IdPurchase: string) => () => {
    setOrderId(IdPurchase)
  }
  const handleHide = () => {
    setOrderId(null)
    refetch()
  }

  /// trạng thái đánh giá đơn hàng
  const handleOrderReview = (IdPurchase: string) => () => {
    setOrderReview(IdPurchase)
  }
  const handleHideOrderReview = () => {
    setOrderReview(null)

    refetch()
  }

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.orderDetail,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames(
        'flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-[6px] font-extralight capitalize text-slate-800 md:text-xs lg:text-sm',
        {
          'border-b-orange text-orange': status === tab.status,
          'border-b-black/10 text-gray-800': status !== tab.status
        }
      )}
    >
      {tab.name}
    </Link>
  ))
  return (
    <div className='overflow-auto'>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
      <div>
        {purchasesInCart && purchasesInCart.length > 0 ? (
          purchasesInCart?.map((purchase) => (
            <div
              key={purchase._id}
              className='mt-1 rounded-sm border-black/10 bg-white p-3 text-[6px] text-slate-700 shadow-sm md:mt-2 md:text-xs lg:mt-4 lg:p-5 lg:text-sm'
            >
              {/* <Link to={`${path.home}${generateURLNameAndId({ name: purchase.product.name, id: purchase.product._id })}`}> */}
              {purchase.detailPurchase.map((item) => (
                <div key={item._id}>
                  <div className='flex'>
                    <div className='flex-shrink-0'>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className='h-8 w-8 border border-gray-200 object-cover md:h-14 md:w-14 lg:h-24 lg:w-24'
                      />
                    </div>
                    <div className='ml-3 flex-grow overflow-hidden'>
                      <div className='line-clamp-4'>{item.product.name}</div>
                      <div className='mt-2'>Số lượng: {item.buy_count}</div>
                    </div>
                  </div>
                  <div className='mb-2 flex justify-end'>
                    {item.product.price === 0 ? (
                      <></>
                    ) : (
                      <span className='truncate  text-gray-600 line-through'>
                        ₫{formatCurrency(item.product.price_before_discount)}
                      </span>
                    )}
                    <span className='truncate text-orange'>
                      ₫
                      {formatCurrency(
                        item.product.price === 0 ? item.product.price_before_discount : item.product.price
                      )}
                    </span>
                  </div>
                  {/* </Link> */}
                  <hr />
                </div>
              ))}
              <div className='mt-2 flex justify-between'>
                {purchase?.status === detailStatus.inProgress && (
                  <div className='flex'>
                    <span>Nhận Hàng Lúc: </span>
                    <span className='ml-2 text-orange'>{renderDate(purchase?.delivered_at)}</span>
                  </div>
                )}
                <div className='flex'>
                  {purchase?.status === detailStatus.inProgress && (
                    <div className='flex'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='mb-2 h-4 w-4 text-green-500'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                        />
                      </svg>
                    </div>
                  )}
                  <div className={`pb-2 capitalize ${renderColorStatusCode(purchase?.status)}`}>
                    {renderStatusCode(purchase?.status)}
                  </div>
                  {purchase?.status === detailStatus.delivered && (
                    <div className='flex px-4'>
                      <span>Đã nhận hàng vào lúc: </span>
                      <p className='text-orange'>{renderDate(purchase?.paiAt)}</p>
                    </div>
                  )}
                  {purchase?.status === detailStatus.waitForConfirmation && (
                    <>
                      <button
                        className='ml-5 rounded-sm border border-orange px-4  text-orange hover:bg-orange hover:text-white'
                        onClick={handleDeleteOrder(purchase._id)}
                      >
                        Hủy Đơn Hàng
                      </button>
                      {orderId && <Modal orderId={orderId} onHide={handleHide} />}
                    </>
                  )}
                  {purchase?.status === detailStatus.cancelled && (
                    <div className='flex px-4'>
                      <span>{purchase?.WhoCanceled}:</span>
                      <p className='mx-2 text-orange'>{purchase?.reasonForMessage}</p>
                    </div>
                  )}
                </div>

                <div className='flex'>
                  <p className='text-gray-500'>Phí Giao Hàng: </p>
                  <p className='text-red-500'>₫{formatCurrency(purchase?.priceDelivery)}</p>
                </div>
              </div>
              <div className='mt-2 flex justify-end'>
                <div>
                  <span>Tổng giá tiền: </span>

                  <span className='text-[8px] text-orange md:text-sm lg:text-lg'>
                    ₫{formatCurrency(purchase?.total_price)}
                  </span>
                </div>
              </div>
              {purchase?.status === detailStatus.delivered && (
                <>
                  <button
                    className='rounded-sm bg-blue-500 px-4 py-2 text-[8px] text-white hover:bg-blue-500/80  md:text-sm lg:text-sm'
                    onClick={handleOrderReview(purchase._id)}
                  >
                    Đánh Giá Đơn Hàng
                  </button>

                  {OrderReview && <ModalReview orderId={OrderReview} onHide={handleHideOrderReview} />}
                </>
              )}
              {purchase?.status === detailStatus.inProgress && (
                <button
                  className='mt-2 flex justify-end rounded-sm border border-blue-500 px-3 py-2 text-blue-500 hover:bg-blue-500 hover:text-white'
                  onClick={handleDeliveredOrder(purchase._id)}
                >
                  <span>Đã Nhận Được Hàng</span>
                </button>
              )}
            </div>
          ))
        ) : (
          <div className='flex items-center justify-center bg-white py-20 text-[6px] text-cyan-600 md:text-xs lg:text-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 lg:h-6 lg:w-6 '
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184'
              />
            </svg>

            <span>Chưa có đơn hàng</span>
          </div>
        )}
      </div>
    </div>
  )
}
