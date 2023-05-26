/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string
  classNameInput?: string
  classNameError?: string
}
/// === truyền giá trị mặc định
function InputV2(props: UseControllerProps<any> & InputNumberProps) {
  const {
    className,
    type,
    classNameError = 'mt-1 min-h-[1rem] text-sm text-red-600',
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-md',
    onChange,
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value
    const numberCondition = (type === 'number' && /^\d+$/.test(valueFormInput)) || valueFormInput === ''
    // loại if này dành cho Input kiểu "number" và "text" đêu xài được
    if (numberCondition || type !== 'number') {
      // cập nhật localValue state
      setLocalValue(valueFormInput)
      // gọi field.onChange(event) để cập nhật state React Hook Form
      field.onChange(event)
      //  thực thi onChange callback từ bên ngoài truyền vào thông qua props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
