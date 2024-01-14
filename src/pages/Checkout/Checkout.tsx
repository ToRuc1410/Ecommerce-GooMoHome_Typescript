import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchasesAPI from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { calculateTotalDimensions, calculateTotalWeight, convertKgToGram, formatCurrency } from 'src/utils/FuncFormat'
import http from 'src/utils/http'
import { Schema, schema } from 'src/utils/ruleValidateForm'

type FormData = Pick<
  Schema,
  'name' | 'phone' | 'address' | 'message' | 'optionAddress1' | 'optionAddress2' | 'optionAddress3'
>
const perchasesSchema = schema.pick([
  'name',
  'phone',
  'address',
  'message',
  'optionAddress1',
  'optionAddress2',
  'optionAddress3'
])

interface address {
  ProvinceName: string
  ProvinceID: number | string
}
interface district {
  DistrictID: number | string
  DistrictName: string
}
interface ward {
  WardCode: number | string
  WardName: string
}
interface Services {
  service_id: string
  short_name: string
  service_type_id: string
}
type ButtonName = 'vppay' | 'code'
export default function Checkout() {
  const { dataPurchase } = useContext(AppContext)

  const [provinces, setProvinces] = useState<address[]>([])
  const [selectedProvince, setSelectedProvince] = useState({
    code: '',
    name: ''
  })

  const [districts, setDistricts] = useState<district[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState({
    code: '',
    name: ''
  })
  const [wards, setWards] = useState<ward[]>([])
  const [selectedWard, setSelectedWard] = useState({
    code: '',
    name: ''
  })

  const [Service, setService] = useState<Services[]>([])
  const [selectedService, setSelectedService] = useState('')

  const [data, setData] = useState(0)

  // const [afterTotalPrice, setAfterTotalPrice] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(perchasesSchema)
  })

  const navigate = useNavigate()

  // tính giá tổng đơn hàng
  const totalPrice = dataPurchase.reduce((result, current) => {
    return (
      result +
      (current.product.price !== 0 ? current.product.price : current.product.price_before_discount) * current.buy_count
    )
  }, 0)

  // tính trung bình cân nặng
  const calculateWeight = convertKgToGram(calculateTotalWeight(dataPurchase))

  // tổng kích thước
  const resultData = calculateTotalDimensions(dataPurchase)

  const buyProductCodeMutation = useMutation({
    mutationFn: purchasesAPI.buyProductsCode,
    onSuccess: (data) => {
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
      navigate({
        pathname: path.orderDetail,
        search: createSearchParams({
          status: '1'
        }).toString()
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err.response.data.message, {
        position: 'top-center',
        autoClose: 5000
      })
    }
  })
  const buyProductVnPayMutation = useMutation({
    mutationFn: purchasesAPI.buyProductsVnPay
    // onSuccess: (data) => {
    //   toast.success(data.data.message, {
    //     position: 'top-center',
    //     autoClose: 1000
    //   })
    //   navigate({
    //     pathname: path.orderDetail,
    //     search: createSearchParams({
    //       status: '1'
    //     }).toString()
    //   })
    // },
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // onError: (err: any) => {
    //   toast.error(err.response.data.message, {
    //     position: 'top-center',
    //     autoClose: 5000
    //   })
    // }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnSubmit = handleSubmit(async (dataForm, event: any) => {
    const rs = window.confirm('hãy đảm bảo rằng bạn đã xem xét kỹ tất cả các thông tin trước khi xác nhận đơn hàng')
    // Truy cập vào name của button
    if (rs) {
      if (event && event.nativeEvent.submitter) {
        const buttonName = (event.nativeEvent.submitter as HTMLButtonElement).name as ButtonName
        if (buttonName == 'code') {
          const dataProduct = dataPurchase.map((item) => ({
            product_id: item.product._id,
            buy_count: item.buy_count
          }))
          const dataPurchases = {
            codeProvince: selectedProvince.name,
            codeDictrict: selectedDistrict.name,
            codeWard: selectedWard.name,
            address: dataForm.address,
            name: dataForm.name,
            phone: dataForm.phone,
            message: dataForm.message || '',
            products: dataProduct,
            priceDelivery: data,
            totalPrice: afterTotalPrice
          }
          await buyProductCodeMutation.mutateAsync(dataPurchases)
        } else {
          toast.error('Thông tin chưa xác nhận ')
        }
      }
    }
  })

  //====== lấy tất cả tỉnh
  useEffect(() => {
    const getProvinces = async () => {
      try {
        const response = await http.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/province')

        setProvinces(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    getProvinces()
  }, [])

  // handleProvinceChange
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProvinceChange = (event: any) => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    const provinceCode = selectedOption.value
    const provinceName = selectedOption.text

    setSelectedProvince({
      code: provinceCode,
      name: provinceName
    })
  }

  //====== lấy tất cả huyện
  useEffect(() => {
    const getDistrict = async () => {
      try {
        const response = await http.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
          params: {
            province_id: selectedProvince.code // Thay 'TPHCM' bằng mã tỉnh thành bạn muốn lấy thông tin
          }
        })

        setDistricts(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    if (selectedProvince.code) {
      getDistrict()
    } else {
      setDistricts([])
      setWards([])
      setSelectedDistrict({ code: '', name: '' })
      setSelectedWard({ code: '', name: '' })
    }
  }, [selectedProvince])

  // handleProvinceChange
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDistrictChange = (event: any) => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    const districtCode = selectedOption.value
    const districtName = selectedOption.text

    setSelectedDistrict({
      code: districtCode,
      name: districtName
    })
  }
  //====== lấy tất cả Phường/xã
  useEffect(() => {
    const getWard = async () => {
      try {
        const response = await http.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
          params: {
            district_id: selectedDistrict.code
          }
        })

        setWards(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    if (selectedDistrict.code) {
      getWard()
    } else {
      setWards([])
      setSelectedWard({ code: '', name: '' })
    }
  }, [selectedDistrict])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleWardChange = (event: any) => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    const wardCode = selectedOption.value
    const wardName = selectedOption.text

    setSelectedWard({
      code: wardCode,
      name: wardName
    })
  }

  //====== lấy Dịch Vụ Phù Hợp giao Hàng
  useEffect(() => {
    const getService = async () => {
      try {
        const response = await http.get(
          'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
          {
            params: {
              shop_id: 4263310,
              from_district: 1458,
              to_district: selectedDistrict.code
            }
          }
        )

        setService(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    if (selectedDistrict.code) {
      getService()
    }
  }, [selectedDistrict])

  useEffect(() => {
    if (Service && Service.length > 0) {
      setSelectedService(Service[0].service_id)
    }
  }, [Service])
  //====== Phí giao hàng
  useEffect(() => {
    const getFee = async () => {
      try {
        const response = await http.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
          params: {
            // service_id: 53320,
            service_id: selectedService,
            insurance_value: totalPrice,
            coupon: null,
            from_district_id: 1458,
            to_district_id: Number(selectedDistrict.code),
            to_ward_code: selectedWard.code,
            height: resultData.totalHeight,
            length: resultData.maxLength,
            weight: calculateWeight,
            width: resultData.maxWidth
          }
        })
        const resultDeliveri = response.data.data.total
        setData(resultDeliveri)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error)
      }
    }
    if (totalPrice && selectedDistrict.code && selectedWard.code && calculateWeight && selectedService && resultData) {
      getFee()
    }
  }, [totalPrice, selectedDistrict, selectedWard, calculateWeight, resultData, selectedService, data])
  const afterTotalPrice = data + totalPrice
  return (
    <div className='border-b-4 border-b-orange bg-gray-100'>
      <div className='container'>
        <form className='container' onSubmit={handleOnSubmit} noValidate>
          <p className='pb-4 pt-2 text-center text-gray-500'>
            Vui lòng điền thông tin khách hàng và kiểm tra giỏ hàng trước khi đặt hàng
          </p>
          <div className='grid grid-cols-12 gap-2 border-b-2 border-b-gray-300'>
            <div className='col-span-7 md:px-4 lg:px-10'>
              <div className='flex'>
                <h3 className='px-2 py-3 text-[10px] text-red-400 md:text-sm lg:text-xl'>Thông Tin Khách Hàng</h3>
                <span className=' text-red-500 md:pt-2'>*</span>
              </div>
              <div className='flex-col lg:flex lg:flex-row lg:py-4 '>
                <div className='mr-2 pt-2 lg:flex lg:flex-col'>
                  <p className='text-[8px] md:text-sm lg:text-sm'>Chọn Thành Phố/Tỉnh </p>
                  <select
                    // className='relative w-40 transform px-4 py-2 text-[8px] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer md:text-sm lg:w-full lg:text-sm'
                    className='relative appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white'
                    value={selectedProvince.code}
                    {...register('optionAddress1')}
                    name='optionAddress1'
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={handleProvinceChange}
                  >
                    <option value='' disabled>
                      Chọn Thành Phố/Tỉnh
                    </option>
                    {provinces.map((item) => (
                      <option key={item.ProvinceID} value={item.ProvinceID}>
                        {item.ProvinceName}
                      </option>
                    ))}
                  </select>
                  {errors.optionAddress1 && (
                    <span className='text-[8px] text-red-500 md:text-sm lg:text-sm'>
                      {errors.optionAddress1?.message}
                    </span>
                  )}
                </div>

                <div className='pt-2 lg:flex lg:flex-col'>
                  <p className='text-[8px] md:text-sm lg:text-sm'>Chọn Quận/Huyện: </p>
                  <select
                    className='relative appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white'
                    value={selectedDistrict.code || ''}
                    {...register('optionAddress2')}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={handleDistrictChange}
                    disabled={!selectedProvince.code}
                  >
                    <option value='' disabled>
                      Chọn Quận/Huyện
                    </option>
                    {districts &&
                      districts.map((item) => (
                        <option key={item.DistrictID} value={item.DistrictID}>
                          {item.DistrictName}
                        </option>
                      ))}
                  </select>
                  {errors.optionAddress2 && (
                    <span className='text-[8px] text-red-500 md:text-sm lg:text-sm'>
                      {errors.optionAddress2?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className='mb-2 lg:flex lg:flex-col'>
                <p className='text-[8px] md:text-sm lg:text-sm'>Chọn Phường/Xã </p>
                <select
                  className='relative appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white'
                  value={selectedWard.code || ''}
                  {...register('optionAddress3')}
                  onChange={handleWardChange}
                  disabled={!selectedDistrict.code}
                >
                  <option value='' disabled>
                    Chọn Phường/Xã
                  </option>
                  {wards &&
                    wards.map((item) => (
                      <option key={item.WardCode} value={item.WardCode}>
                        {item.WardName}
                      </option>
                    ))}
                </select>
                {errors.optionAddress3 && (
                  <span className='text-[8px] text-red-500 md:text-sm lg:text-sm'>
                    {errors.optionAddress3?.message}
                  </span>
                )}
              </div>
              <div className='mx-auto pt-2 md:flex-row lg:flex-row'>
                <div className=''>
                  <p className='text-[8px] md:text-sm lg:text-sm'>Nhập địa chỉ cụ thể </p>
                  <Input
                    className='text-[8px] md:text-sm lg:text-sm'
                    errors={errors.address?.message}
                    placeholder='Nhập địa chỉ cụ thể'
                    name='address'
                    register={register}
                    type='text'
                  />
                </div>
                <div className=''>
                  <p className='text-[8px] md:text-sm lg:text-sm'>Nhập tên </p>
                  <Input
                    className=' text-[8px] md:text-sm lg:text-sm'
                    errors={errors.name?.message}
                    register={register}
                    placeholder='Nhập tên'
                    name='name'
                    type='text'
                  />
                </div>
                <div className=''>
                  <p className='text-[8px] md:text-sm lg:text-sm'>Nhập Số Điện Thoại </p>
                  <Input
                    className='text-[8px] md:text-sm lg:text-sm'
                    errors={errors.phone?.message}
                    placeholder='Nhập Số Điện Thoại'
                    name='phone'
                    register={register}
                    type='text'
                  />
                </div>
              </div>
              <p className='text-[8px] md:text-sm lg:text-sm'>Tin nhắn: </p>
              <Input
                className='text-[8px] md:text-sm lg:text-sm'
                placeholder='Để lại lời nhắn cho shop nếu có...'
                name='message'
                register={register}
              />
            </div>
            <div className='col-span-5 text-[8px]  md:text-sm  lg:text-sm'>
              <div className='flex justify-between'>
                <h3 className='px-2 py-4 text-[8px] text-red-400 md:text-sm lg:text-xl'>Thông Tin Đơn Mua Hàng </h3>
                <span className='rounded-full bg-orange px-6 pt-4 text-center text-lg text-white'>
                  {dataPurchase.length}
                </span>
              </div>
              <div className='border border-white bg-slate-200'>
                {dataPurchase.map((item, index) => (
                  <div className='flex justify-start border bg-white py-2' key={index}>
                    <div className='float-left h-7 w-7 text-[5px] md:h-20 md:w-20 lg:h-28 lg:w-28 '>
                      <img
                        className='h-7 w-7 object-contain md:h-full md:w-full  lg:h-28 lg:w-28'
                        src={item.product.image}
                        alt={item.product.name}
                      />
                    </div>
                    <div className='flex flex-col text-[6px] md:text-xs lg:text-sm'>
                      <div className='flex-wrap'>{item.product.name}</div>
                      <div className='ml-2 mt-2 flex text-gray-500'>
                        <div>
                          {item.product.price !== 0
                            ? `₫${formatCurrency(item.product.price)}`
                            : `₫${formatCurrency(item.product.price_before_discount)}`}
                        </div>
                        <span className='px-1'>*</span>
                        <div>{item.buy_count}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='flex justify-around p-3'>
                  <span className='text-xs md:text-sm lg:text-lg'>Tổng giá sản phẩm: </span>
                  <span className='text-xs md:text-sm lg:text-lg'>₫{formatCurrency(totalPrice)}</span>
                </div>

                <div className='flex justify-end py-3'>
                  <div className='mx-auto flex text-green-500'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                      />
                    </svg>

                    <p className='pt-1'>Phí Giao Hàng:</p>
                  </div>
                  <p className='mx-auto pt-1 text-sm italic'>₫{formatCurrency(data)}</p>
                </div>
                <div className='flex justify-end rounded-sm border border-gray-400 bg-white p-2 py-2 text-[8px] text-orange md:text-sm lg:mt-3 lg:text-lg '>
                  <div className='mr-2'>Tổng Thành Tiền: </div>
                  <span>₫{formatCurrency(afterTotalPrice)}</span>
                </div>
                <div className='flex p-3 text-[8px] md:text-sm lg:text-sm'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3 lg:h-6 lg:w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <p className='lg:py-1'>Phương Thức Thanh Toán:</p>
                </div>
                <div className='flex justify-end p-2'>
                  <Button
                    name='code'
                    className=' hover:white h-10 w-52 rounded border border-gray-500 bg-gray-50 px-3 text-[8px] hover:border-orange hover:text-orange md:h-12 md:w-52 md:text-sm lg:h-14 lg:w-52 lg:text-sm'
                  >
                    Thanh Toán Khi Nhận Hàng(COD)
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className=''></div>
        </form>
      </div>
    </div>
  )
}
