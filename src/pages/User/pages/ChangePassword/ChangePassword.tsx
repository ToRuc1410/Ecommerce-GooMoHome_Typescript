import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { UserSchema, userSchema } from 'src/utils/ruleValidateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import userAPI from 'src/apis/user.api'
import omit from 'lodash/omit'
import { toast } from 'react-toastify'
import { isAxiosStatusCodeError } from 'src/utils/utilsErrForm'
import { ErrorResponse } from 'src/types/utils.type'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const updateMutation = useMutation(userAPI.updateProfile)
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateMutation.mutateAsync(omit(data, ['confirm_password']))

      toast.success(res.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
      reset()
    } catch (error) {
      if (isAxiosStatusCodeError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        // nếu là 1 FormDataError thì nên dùng forEach để set cho từng keyError
        if (formError) {
          Object.keys(formError).forEach((key) => {
            // convert from Object formError to key
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='bg-white'>
      <div className=' border border-b-gray-300 px-10 py-3'>
        <h3 className='text-[10px] capitalize md:text-xs lg:text-sm'>Hồ Sơ Của tôi</h3>
        <div className='mt-1 text-[8px] capitalize text-gray-600 md:text-xs lg:text-sm'>
          quản lý hồ sơ bảo mật tài khoảng
        </div>
      </div>
      <form className='mt-5 flex flex-col-reverse items-center md:flex-row lg:mx-5 lg:flex-row' onSubmit={onSubmit}>
        <div className='my-5 flex-grow text-[8px] md:text-xs lg:text-sm'>
          <div className='flex flex-wrap md:mt-2 lg:mt-2 '>
            <div className='mt-2 w-[30%] text-right'>Mật Khẩu Cũ: </div>
            <div className='w-[70%] pl-1 md:pl-5 lg:pl-5'>
              <Input
                classNameInput=' w-[70%] rounded-sm border border-gray-200 px-3 py-2 outline-none'
                register={register}
                className='relative'
                type='password'
                name='password'
                placeholder='Mật Khẩu Cũ'
                errors={errors.password?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap md:mt-2 lg:mt-2 '>
            <div className='mt-2 w-[30%] text-right'>Mật Khẩu Mới: </div>
            <div className='w-[70%] pl-1 md:pl-5 lg:pl-5'>
              <Input
                classNameInput='w-[70%] rounded-sm border border-gray-200 px-3 py-2 outline-none'
                register={register}
                className='relative'
                type='password'
                name='new_password'
                placeholder='Mật Khẩu Mới'
                errors={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap md:mt-2 lg:mt-2 '>
            <div className='mt-2 w-[30%] text-right'>Nhập Lại Mật Khẩu Mới: </div>
            <div className='w-[70%] pl-1 md:pl-5 lg:pl-5'>
              <Input
                classNameInput=' w-[70%] rounded-sm border border-gray-200 px-3 py-2 outline-none'
                register={register}
                className='relative'
                type='password'
                name='confirm_password'
                placeholder='Nhập Lại Mật Khẩu Mới'
                errors={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className='flex md:mt-2 lg:mt-2 '>
            <div className='mt-2 w-[30%] text-right' />
            <div className='w-[70%] pl-1 md:pl-5 lg:pl-5'>
              <Button
                className='h-9 rounded-sm bg-orange px-4 py-1 text-center text-white hover:bg-orange/80 hover:shadow-md md:py-2 lg:px-6 lg:py-2'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
