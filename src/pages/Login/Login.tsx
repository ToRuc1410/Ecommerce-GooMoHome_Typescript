import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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
    setError,
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
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-5 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
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
              <div className='mt-5 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn mới biết GooHome?</span>
                <Link className='px-1 text-red-600' to={path.register}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
