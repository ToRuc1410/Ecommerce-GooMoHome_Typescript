import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/ruleValidateForm'
import { isAxiosStatusCodeError } from 'src/utils/utilsErrForm'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  // gọi func API
  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })
  const handleOnSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      // nếu thành công thì:
      onSuccess: (data) => {
        // nếu thành công thì set nó thành setIsAuthenticated=true và vào mainlayout
        setIsAuthenticated(true)
        // và setProfile data User vào localStorage
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosStatusCodeError<ErrorResponse<FormData>>(error)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formError: any = error.response?.data.message
          toast.error(formError.message)
        }
      }
    })
  })
  return (
    <div className='bg-orange '>
      <div className='container'>
        <div className='grid grid-cols-1 py-5 lg:grid-cols-12 lg:py-32 '>
          <div className='lg:col-span-7'>
            <div className=' lg:flex lg:flex-col'>
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
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                errors={errors.email?.message}
                placeholder='Email'
                name='email'
                register={register}
                type='email'
              />
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
              <div className='mt-2'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-orange py-4 text-sm uppercase text-white hover:bg-red-400'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-5 flex justify-between py-2'>
                <div className='text-xs md:text-sm lg:text-sm'>
                  <span className='text-gray-400'>Bạn mới biết GooHome?</span>
                  <Link className='px-5 text-red-600 md:px-1 lg:px-1' to={path.verifyEmail}>
                    Đăng ký
                  </Link>
                </div>
                <div className='text-xs md:text-sm lg:text-sm'>
                  <Link className='text-blue-500' to={path.forgotPassWord}>
                    Quên Mật Khẩu
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
