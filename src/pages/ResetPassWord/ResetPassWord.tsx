import { Schema, schema } from 'src/utils/ruleValidateForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'password' | 'confirm_password'>
const registerSchema = schema.pick(['password', 'confirm_password'])
export default function ResetPassWord() {
  const { tokenPassword } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const navigate = useNavigate()
  const resetPasswordMutation = useMutation({
    mutationFn: (body: { token: string; password: string }) => authApi.resetPassword(body)
  })
  const handleOnSubmit = handleSubmit(async (data) => {
    // loại bỏ trường confirm_password
    // const body = omit(data, ['confirm_password'])

    try {
      const res = await resetPasswordMutation.mutateAsync({ token: tokenPassword as string, password: data.password })
      if (res) {
        // setIsAuthenticated(true)
        // // và setProfile data User vào localStorage
        // setProfile(res.data.data.user)
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 1000
        })
        navigate(path.login)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data.message)
    }
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-5 lg:grid-cols-12 lg:py-32 '>
          <div className='lg:col-span-7'>
            <div className='rounded-sm lg:flex lg:flex-col'>
              <img
                src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=819.000032544136,fit=crop/YbNbPPqn2EfwxjP7/chat-hon-to-cu-1-png-m7V2704oB7HDV1b2.png'
                alt=''
                className='ml-28 h-32 w-32 rounded-full bg-white object-contain lg:ml-52 lg:mt-5 lg:h-80 lg:w-80 lg:p-10'
              />
              <h2 className='ml-20 mr-24 mt-3 flex-shrink-0 border-b-2 border-t-2 border-gray-200 px-10 py-4 pt-4 text-[8px] text-gray-100 lg:ml-36 lg:text-lg'>
                THIẾT KẾ NỘI THẤT DECOR TRANG TRÍ NHÀ CỬA
              </h2>
            </div>
          </div>
          <div className='lg:col-span-5 '>
            <form className='m-4 rounded bg-white p-10 shadow-lg' onSubmit={handleOnSubmit} noValidate>
              <div className='py-2 text-2xl'>Cập Nhật Lại Password</div>
              <Input
                className='mt-2'
                errors={errors.password?.message}
                placeholder='Password'
                name='password'
                register={register}
                type='password'
                autoComplete='on'
                classNameEye='absolute h-5 w-5 top-[10px] right-[10%] cursor-pointer'
              />
              <Input
                className='mt-2'
                errors={errors.confirm_password?.message}
                placeholder='Confirm Password'
                name='confirm_password'
                register={register}
                type='password'
                autoComplete='on'
                classNameEye='absolute h-5 w-5 top-[10px] right-[10%] cursor-pointer'
              />
              <div className='mt-2'>
                <Button
                  className='flex w-full items-center justify-center bg-orange py-4 text-center text-sm uppercase text-white hover:bg-red-400'
                  type='submit'
                  isLoading={resetPasswordMutation.isLoading}
                  disabled={resetPasswordMutation.isLoading}
                >
                  Gửi
                </Button>
              </div>
              <div className='mt-5 flex items-center justify-center'>
                {/* <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='px-1 text-red-600' to={path.login}>
                  Đăng nhập
                </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
