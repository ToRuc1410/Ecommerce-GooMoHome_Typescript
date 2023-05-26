import { useMutation, useQuery } from '@tanstack/react-query'
import userAPI from 'src/apis/user.api'
import { useForm, Controller, useWatch } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/ruleValidateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DateSelect from '../../Components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileUserFromLS } from 'src/utils/auth'
import { getAvatarUrl } from 'src/utils/FuncFormat'
import { isAxiosStatusCodeError } from 'src/utils/utilsErrForm'
import { ErrorResponse } from 'src/types/utils.type'
import config from 'src/constants/config'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'avatar', 'date_of_birth'])

export default function Profile() {
  // gọi context update thông tin tổng của user
  const { profile, setProfile } = useContext(AppContext)

  const [file, setFile] = useState<File>()

  const fileInput = useRef<HTMLInputElement>(null)
  const uploadAvatarMutation = useMutation(userAPI.uploadAvatar)
  const previewImg = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      avatar: '',
      date_of_birth: new Date(2000, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const avatar = watch('avatar')

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile
  })
  const resProfile = profileData?.data.data

  const updateMutation = useMutation(userAPI.updateProfile)

  useEffect(() => {
    if (resProfile) {
      setValue('name', resProfile.name)
      setValue('phone', resProfile.phone)
      setValue('address', resProfile.address)
      setValue('date_of_birth', resProfile.date_of_birth ? new Date(resProfile.date_of_birth) : new Date(2000, 0, 1))
      setValue('avatar', resProfile.avatar)
    }
  }, [resProfile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        /// upload img
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
      }
      const res = await updateMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      // sau khi cập nhật nên update thông tin user trong localStorage
      setProfileUserFromLS(res.data.data)
      // sau khi cập nhật nên update thông tin user trong context
      setProfile(res.data.data)
      refetch()
      toast.success(res.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    } catch (error) {
      if (isAxiosStatusCodeError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        // nếu là 1 FormDataError thì nên dùng forEach để set cho từng keyError
        if (formError) {
          Object.keys(formError).forEach((key) => {
            // convert from Object formError to key
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleUpload = () => {
    // sử dụng cơ chế useref để dùng button choose hình ảnh từ input:file
    fileInput?.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    console.log(fileFromLocal)
    // validate file about size <= 1mb and type is 'image'
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUpload || fileFromLocal.type.includes('image'))) {
      toast.warning('Dung lượng file tối đa là 1 MB và Định dạng:.JPEG, .PNG', {
        position: 'top-center',
        autoClose: 2000
      })
    } else {
      setFile(fileFromLocal)
    }
  }

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
          <div className='flex'>
            <div className='w-[20%] text-right'>Email: </div>
            <div className='w-[80%] pl-5'>
              <div className='text-gray-500'> {resProfile?.email}</div>
            </div>
          </div>
          <div className='mt-3 flex flex-wrap md:mt-5 lg:mt-5 '>
            <div className='mt-2 w-[20%] text-right'>Tên: </div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-[80%] rounded-sm border border-gray-200 px-3 py-2 outline-none'
                register={register}
                name='name'
                placeholder='Nhập Tên'
                errors={errors.name?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap md:mt-2 lg:mt-2 '>
            <div className=' mt-1 w-[20%] text-right'>Số Điện Thoại: </div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-[80%] rounded-sm border border-gray-200 px-3 py-2 outline-none'
                    placeholder='Nhập Số Điện Thoại'
                    errors={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex flex-wrap md:mt-2 lg:mt-2 '>
            <div className='mt-2 w-[20%] text-right'>Địa Chỉ: </div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-[80%] rounded-sm border border-gray-200 px-3 py-2 outline-none'
                register={register}
                name='address'
                placeholder='Nhập Địa Chỉ'
                errors={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
            )}
          />
          <div className='flex md:mt-2 lg:mt-2 '>
            <div className='mt-2 w-[20%] text-right' />
            <div className='w-[80%] pl-5'>
              <Button
                className='h-9 rounded-sm bg-orange px-4 py-1 text-center text-white hover:bg-orange/80 hover:shadow-md md:py-2 lg:px-6 lg:py-2'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:border-l md:border-l-gray-400 lg:py-10'>
          <div className='flex flex-col items-center text-[8px] md:text-xs  lg:text-sm'>
            <div className='my-2 h-8 w-8  md:h-12 md:w-12 lg:h-20 lg:w-20'>
              <img
                //src={profile?.avatar ? profile.avatar : user}
                src={previewImg || getAvatarUrl(avatar)}
                alt='avatar'
                className='h-full w-full rounded-full border border-gray-300 object-cover'
              />
            </div>
            <input
              className='hidden'
              type='file'
              accept='.jpg,.jpeg,.png'
              ref={fileInput}
              onChange={onFileChange}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={(event) => ((event.target as any).value = null)}
            />
            <button
              className='my-1 flex border bg-white px-3 py-2  text-black shadow-sm '
              type='button'
              onClick={handleUpload}
            >
              Chọn Ảnh
            </button>
            <div className='mx-2 text-gray-500'> Dung lượng file tối đa 1 MB</div>
            <div className='mx-2 text-gray-500'>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
      </form>
    </div>
  )
}
