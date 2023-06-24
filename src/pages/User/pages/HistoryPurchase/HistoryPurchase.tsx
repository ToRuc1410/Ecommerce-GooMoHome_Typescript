import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import purchasesAPI from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { detailStatus } from 'src/constants/purchaseStatus'
import useQueryParams from 'src/hooks/useQueryParams'
import { OrderDetailListStatus } from 'src/types/purchase.type'
import { formatCurrency } from 'src/utils/FuncFormat'

const purchaseTabs = [
  { status: detailStatus.all, name: 'Tất cả' },
  { status: detailStatus.waitForConfirmation, name: 'Chờ Xác Nhận' },
  { status: detailStatus.waitForGetting, name: 'Chờ Lấy Hàng' },
  { status: detailStatus.inProgress, name: 'Đang Giao' },
  { status: detailStatus.delivered, name: 'Đã Giao' },
  { status: detailStatus.cancelled, name: 'Đã Hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || detailStatus.all

  // gọi API lấy giỏ hàng trong Cart và phải là user đã Login || Register
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['order-detail', { status }],
    queryFn: () => purchasesAPI.orderDetailPurchase({ status: status as OrderDetailListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data
  console.log(purchasesInCartData)
  // render sideNav
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
        {purchasesInCart?.map((purchase) => (
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
                    {formatCurrency(item.product.price === 0 ? item.product.price_before_discount : item.product.price)}
                  </span>
                </div>
                {/* </Link> */}
                <hr />
                <div className='mt-2 flex justify-end'>
                  <div>
                    <span>Tổng giá tiền: </span>
                    {item.product.price !== 0 ? (
                      <span className='text-[8px] text-orange md:text-sm lg:text-lg'>
                        ₫{formatCurrency(item.product.price * item.buy_count)}
                      </span>
                    ) : (
                      <span className='text-[8px] text-orange md:text-sm lg:text-lg'>
                        ₫{formatCurrency(item.product.price_before_discount * item.buy_count)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
