/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

//step1: validation form by react-hook-form
export const getRules = (getValues?: UseFormGetValues<any>) => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5-160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5-160 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6-160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6-160 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm_password lại password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6-160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6-160 kí tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value: any) => value === getValues('password') || 'Nhập lại password không khớp'
        : undefined
  }
})

//=============================================================================
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  // true khi price min và price max != rỗng và max >= min
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== '' // false khi cả 2 rỗng
}

const handleConfimPassYup = (refString: string) => {
  return (
    yup
      .string()
      .required('Nhập lại password là bắt buộc')
      .min(6, 'Độ dài từ 6-160 kí tự')
      .max(160, 'Độ dài từ 6-160 kí tự')
      // kiểm tra tham chiếu với trường password
      .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
  )
}
//step2: validation form by Yup
export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 kí tự')
    .max(160, 'Độ dài từ 5-160 kí tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6-160 kí tự')
    .max(160, 'Độ dài từ 6-160 kí tự'),
  //confirm_password kiểm tra tham chiếu với trường password
  confirm_password: handleConfimPassYup('password'),
  price_min: yup.string().test({
    // this naming rule
    name: 'price-not-allowed',
    message: 'Giá Không Phù Hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    // this naming rule
    name: 'price-not-allowed',
    message: 'Giá Không Phù Hợp',
    test: testPriceMinMax
  }),
  searchProduct: yup.string().trim().required()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Ngày sinh không hợp lệ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  //confirm_password kiểm tra tham chiếu với trường new_password
  confirm_password: handleConfimPassYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
