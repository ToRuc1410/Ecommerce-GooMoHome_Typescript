import { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const fileInput = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]

    // validate file about size <= 1mb and type is 'image'
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUpload || !fileFromLocal.type.includes('image'))) {
      toast.warning('Dung lượng file tối đa là 1 MB và Định dạng:.JPEG, .PNG', {
        position: 'top-center',
        autoClose: 2000
      })
    } else {
      // setFile(fileFromLocal)
      onChange && onChange(fileFromLocal)
    }
  }
  const handleUpload = () => {
    // sử dụng cơ chế useref để dùng button choose hình ảnh từ input:file
    fileInput?.current?.click()
  }
  return (
    <>
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
    </>
  )
}
