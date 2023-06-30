import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import purchasesAPI from 'src/apis/purchase.api'
import QuantityProduct from 'src/components/QuantityProduct'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchaseStatus'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase.type'
import { generateURLNameAndId, formatCurrency } from 'src/utils/FuncFormat'
import noproduct from 'src/assets/img_cart/noCart.png'
import { toast } from 'react-toastify'
import Button from 'src/components/Button'

export default function Cart() {
  // Make 1 listPurchase quản lý bởi localAppContext khi ng dùng check items(products)
  const { extendedPurchases, setExtendedPurchases, setDataPurchase } = useContext(AppContext)
  const checkedPurchase = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchaseCount = checkedPurchase.length
  const navigate = useNavigate()
  const location = useLocation()
  const getPurchaseIdFromCart = (location.state as { purchaseId: string } | null)?.purchaseId

  // gọi API lấy giỏ hàng trong Cart và phải là user đã Login || Register
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesAPI.getPurchase({ status: purchasesStatus.inCart })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const updatePurchaseMutation = useMutation({
    mutationFn: purchasesAPI.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchasesAPI.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  // lấy tất cả giá của sp dc checked
  const totalPriceOnChecked = checkedPurchase.reduce((result, current) => {
    return (
      result +
      (current.product.price !== 0 ? current.product.price : current.product.price_before_discount) * current.buy_count
    )
  }, 0)

  // lấy tất cả giá tiết kiệm
  const totalPriceSavingChecked = checkedPurchase.reduce((result, current) => {
    return (
      result +
      (current.product.price_before_discount -
        (current.product.price !== 0 ? current.product.price : current.product.price_before_discount)) *
        current.buy_count
    )
  }, 0)

  // CheckedAll này khi người dùng chọn từng product cho đến khi hết sản phẩm trong Cart thì mới = true
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  // khi có sự thay đổi purchasesInCart cập nhật lại list
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isCheckedIdFromCart = getPurchaseIdFromCart === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isCheckedIdFromCart || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [getPurchaseIdFromCart, purchasesInCart, setExtendedPurchases])
  // cập nhật F5: các PurchaseId từ Cart(event:Mua ngay)
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])
  //function currying
  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        //mô tả: produce(draft)=>{} là 1 callBack, draft đại diện list hiện tại(extendedPurchases) tìm
        // purchaseIndex là vị trí List extendedPurchases và gán nó khi người dùng check vị trí
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  // delete 1 purchase
  const handleDelete = (purchaseIndex: number) => () => {
    const purchase = extendedPurchases[purchaseIndex]._id
    console.log(purchase)
    deletePurchasesMutation.mutate([purchase], {
      // nếu thành công thì:
      onSuccess: (data) => {
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 2000
        })
      }
    })
  }

  // delete nhiều purchases
  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds, {
      // nếu thành công thì:
      onSuccess: (data) => {
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 2000
        })
      }
    })
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleBuyPurchases = () => {
    if (checkedPurchase.length === 0) {
      toast.error('Bạn vui lòng chọn sản phẩm.', {
        position: 'top-center',
        autoClose: 2000
      })
    }
    const body = checkedPurchase.map((purchase) => ({
      product: purchase.product,
      buy_count: purchase.buy_count
    }))
    setDataPurchase(body)
    navigate(path.checkout)
    // console.log(body)
    // buyProductsMutation.mutate(body)
  }

  return (
    <div className='bg-neutral-200'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='mt-3 grid grid-cols-12 rounded-sm bg-white py-2 text-[7px] text-gray-500 shadow-md md:text-xs lg:py-5 lg:text-sm'>
                <div className='col-span-5'>
                  <div className='flex items-start justify-around'>
                    <div className='flex flex-shrink-0 pr-1'>
                      <input
                        type='checkbox'
                        className='h-3 w-3  accent-orange md:h-4 md:w-4 lg:h-5 lg:w-5'
                        checked={isAllChecked}
                        onChange={handleCheckAll}
                      />
                    </div>
                    <div className='items-center justify-center text-black'>Sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-7'>
                  <div className='grid grid-cols-4 lg:grid-cols-5'>
                    <div className='col-span-1 md:col-span-1 lg:col-span-2'>
                      <div className='flex items-center justify-center'>Đơn Giá</div>
                    </div>
                    <div className='col-span-1'>Số Lượng</div>
                    <div className='col-span-1'>Số Tiền</div>
                    <div className='col-span-1'>Hành Động</div>
                  </div>
                </div>
              </div>
              <div className='my-3 rounded-sm shadow-md'>
                {extendedPurchases?.map((purchase, index) => (
                  <div
                    className='my-2 grid grid-cols-12 items-center justify-center border border-gray-200 bg-white py-2 text-[7px] text-gray-500 md:text-xs lg:text-sm'
                    key={purchase._id}
                  >
                    <div className='col-span-5'>
                      <div className='flex'>
                        <div className=' ml-2 flex items-start justify-start'>
                          <div className=' pr-2'>
                            <input
                              type='checkbox'
                              className='h-3 w-3 accent-orange md:h-4 md:w-4 lg:h-5 lg:w-5'
                              checked={purchase.checked}
                              onChange={handleCheck(index)}
                            />
                          </div>
                          <div className='flex-grow '>
                            <div className='flex'>
                              <Link
                                to={`${path.home}${generateURLNameAndId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className='h-14 w-14 md:h-40 md:w-40 lg:h-40 lg:w-40'
                              >
                                <img
                                  className='h-14 w-14 object-cover md:h-40 md:w-40 lg:h-40 lg:w-40'
                                  src={purchase.product.image}
                                  alt={purchase.product.name}
                                />
                              </Link>
                              <div className='px-2 pb-2 pt-1'>
                                <Link
                                  to={`${path.home}${generateURLNameAndId({
                                    name: purchase.product.name,
                                    id: purchase.product._id
                                  })}`}
                                  className='line-clamp-4'
                                >
                                  {purchase.product.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-7'>
                      <div className='grid grid-cols-4 items-center lg:grid-cols-5'>
                        <div className='col-span-1 md:col-span-1 lg:col-span-2'>
                          <div className='flex flex-wrap items-center justify-center  lg:items-start lg:justify-center'>
                            {purchase.product.price === 0 ? (
                              <></>
                            ) : (
                              <div className='text-gray-400 line-through'>
                                ₫{formatCurrency(purchase.product.price_before_discount)}
                              </div>
                            )}
                            <div className='ml-1 text-gray-700 lg:ml-3 '>
                              ₫
                              {formatCurrency(
                                purchase.product.price === 0
                                  ? purchase.product.price_before_discount
                                  : purchase.product.price
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityProduct
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classWrapper='flex justify-start items-start'
                            onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value !== (purchasesInCart as Purchase[])[index].buy_count
                              )
                            }
                            onType={handleTypeQuantity(index)}
                            disabled={purchase.disabled}
                          />
                        </div>
                        <div className='col-span-1'>
                          <div className='ml-1 flex items-start justify-start text-orange'>
                            ₫
                            {formatCurrency(
                              (purchase.product.price !== 0
                                ? purchase.product.price
                                : purchase.product.price_before_discount) * purchase.buy_count
                            )}
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <button
                            className='ml-5 bg-none transition-colors hover:text-orange'
                            onClick={handleDelete(index)}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='z-5 sticky bottom-0 flex items-center rounded-sm bg-white p-5 text-[8px] text-gray-500 md:text-xs lg:py-5 lg:text-sm'>
              <div className='flext flex flex-shrink-0 items-center justify-center'>
                <input
                  type='checkbox'
                  className='h-3 w-3  accent-orange md:h-4 md:w-4 lg:h-5 lg:w-5'
                  checked={isAllChecked}
                  onChange={handleCheckAll}
                />
              </div>
              <button className='mx-1 border-none bg-none' onClick={handleCheckAll}>
                Chọn Tất Cả ({extendedPurchases.length})
              </button>
              <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchases}>
                Xóa
              </button>
              <div className='ml-auto flex items-center'>
                <div className='ml-2 flex flex-col'>
                  <div className='flex items-center justify-between'>
                    <div>Tổng Thanh Toán: ({checkedPurchaseCount} Sản Phẩm): </div>
                    <div className='ml-2 text-xs text-orange md:text-lg lg:text-lg'>
                      {' '}
                      ₫{formatCurrency(totalPriceOnChecked)}
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>Tiết Kiệm: </div>
                    <div className='ml-2 text-[7px] text-orange md:text-sm lg:text-sm'>
                      {' '}
                      ₫{formatCurrency(totalPriceSavingChecked)}
                    </div>
                  </div>
                </div>
                {checkedPurchaseCount === 0 ? (
                  <Button className='w-50 ml-2 flex h-10 cursor-not-allowed  items-center justify-center bg-orange px-3 text-[7px] capitalize text-white hover:bg-orange/70 md:text-sm lg:mx-5 lg:px-5 lg:text-sm'>
                    Mua hàng
                  </Button>
                ) : (
                  <Button
                    className='w-50 ml-2 flex h-10  items-center justify-center bg-orange px-3 text-[7px] capitalize text-white hover:bg-orange/70 md:text-sm lg:mx-5 lg:px-5 lg:text-sm'
                    onClick={handleBuyPurchases}
                  >
                    Mua hàng
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className='py-10 text-center'>
            <img src={noproduct} alt='No Products' className='h-30 w-30 mx-auto rounded-md' />
            <div className='my-5 text-center capitalize'> Giỏ hàng của bạn trống </div>
            <Link
              to={path.home}
              className='rounded-sm bg-orange px-4 py-2 text-xs text-white hover:bg-orange/50 hover:text-black'
            >
              Mua ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
