/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string
  classNameInput?: string
  classNameError?: string
}
/// === truyền giá trị mặc định
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    errors,
    classNameError = 'mt-1 min-h-[1rem] text-sm text-red-600',
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-md',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      //  thực thi onChange callback từ bên ngoài truyền vào thông qua props
      onChange && onChange(event)
      // cập nhật localValue state
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} value={value || localValue} {...rest} ref={ref} />
      <div className={classNameError}>{errors}</div>
    </div>
  )
})
export default InputNumber
