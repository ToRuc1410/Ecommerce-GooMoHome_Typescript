/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  register: UseFormRegister<any>
  name: string
  rules?: RegisterOptions
  errors?: string
  autoComplete?: string
}

export default function Input({ type, placeholder, className, register, name, rules, errors, autoComplete }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-400 focus:shadow-md'
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors}</div>
    </div>
  )
}
