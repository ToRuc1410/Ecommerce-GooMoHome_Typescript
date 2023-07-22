import { useState } from 'react'
import InputNumber from '../InputNumber'

interface Props {
  max?: number
  value?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classWrapper?: string
  disabled?: boolean
}

export default function QuantityProduct({
  max,
  onIncrease,
  classWrapper = 'ml-10',
  onDecrease,
  onType,
  onFocusOut,
  value,
  ...rest
}: Props) {
  // value này được truyền từ prop vào
  const [localValue, setLocalValue] = useState<number>(Number(value) || 0)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }
  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }
  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  //chức năng: handle khi con trỏ chuột click ra ngoài sự kiện này dành cho Cart
  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }
  return (
    <>
      <div className={`flex items-center ${classWrapper}`}>
        <button
          className='flex h-4 w-4 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600 md:h-5 md:w-5 lg:h-8 lg:w-8'
          onClick={decrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-2 w-2 lg:h-3 lg:w-3'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
          </svg>
        </button>
        <InputNumber
          className=''
          classNameError='hidden'
          classNameInput='h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-16 flex border-t border-b border-gray-300 p-1 text-center outline-none'
          onChange={handleChange}
          value={value || localValue}
          onBlur={handleBlur}
          {...rest}
        />
        <button
          className='flex h-4 w-4 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600 md:h-5 md:w-5 lg:h-8 lg:w-8'
          onClick={increase}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-2 w-2 lg:h-3 lg:w-3'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
    </>
  )
}
