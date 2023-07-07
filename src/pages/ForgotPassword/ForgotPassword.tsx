import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/ruleValidateForm'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import Button from 'src/components/Button'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'email'>
const loginSchema = schema.pick(['email'])
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  // gọi func API
  const forgotPassMutation = useMutation({
    mutationFn: (body: string) => authApi.forgotPass(body)
  })
  const handleOnSubmit = handleSubmit((data) => {
    forgotPassMutation.mutate(data.email, {
      // nếu thành công thì:
      onSuccess: (data) => {
        toast.success(data.data?.message)
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        toast.error(error.response?.data.message)
        // }
      }
    })
  })
  return (
    <div className='bg-orange '>
      <div className='container'>
        <div className='grid grid-cols-1 py-5 lg:grid-cols-12 lg:py-32 '>
          <div className='lg:col-span-7'>
            <div className='lg:flex lg:flex-col'>
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
              <div className='text-2xl'>Quên Mật Khẩu </div>
              <Input
                className='mt-8'
                errors={errors.email?.message}
                placeholder='Email'
                name='email'
                register={register}
                type='email'
              />
              <div className='mt-5 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='px-1 text-red-600' to={path.login}>
                  Đăng nhập
                </Link>
              </div>
              <div className='mt-2'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-orange py-4 text-sm uppercase text-white hover:bg-red-400'
                  isLoading={forgotPassMutation.isLoading}
                  disabled={forgotPassMutation.isLoading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
