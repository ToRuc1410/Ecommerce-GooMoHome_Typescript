/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string
  register?: UseFormRegister<any>
  classNameInput?: string
  classNameError?: string
  rules?: RegisterOptions
}
/// === truyền giá trị mặc định
export default function Input({
  className,
  register,
  name,
  rules,
  errors,
  classNameError = 'mt-1 min-h-[1rem] text-sm text-red-600',
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-md',
  ...rest
}: Props) {
  const registerResult = register && name ? { ...register(name, rules) } : null
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errors}</div>
    </div>
  )
}
