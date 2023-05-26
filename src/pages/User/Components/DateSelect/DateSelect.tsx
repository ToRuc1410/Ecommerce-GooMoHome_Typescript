import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 1,
    year: value?.getFullYear() || 2000
  })
  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])
  const currentYear = new Date().getFullYear()
  const handleDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFormSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFormSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <div className='mb-2  flex flex-wrap md:mt-2 lg:mt-2'>
      <div className='mt-1 w-[20%] text-right md:mt-2 lg:mt-2'>Ngày Sinh: </div>
      <div className='flex w-[80%] justify-around'>
        <select
          onChange={handleDate}
          name='date'
          className='h-5 w-[30%]  appearance-none rounded border border-gray-200 px-3 outline-none hover:border-orange md:h-8 lg:h-10'
          value={value?.getDate() || date.date}
        >
          <option disabled>Ngày</option>
          {range(1, 32).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          onChange={handleDate}
          name='month'
          className='h-5 w-[35%] appearance-none  rounded border border-gray-200 px-1 outline-none hover:border-orange md:h-8 md:px-3 lg:h-10 lg:px-3'
          value={value?.getMonth() || date.month}
        >
          <option disabled>Tháng</option>
          {range(0, 12).map((item) => (
            <option value={item} key={item}>
              {`Tháng ${item + 1}`}
            </option>
          ))}
        </select>
        <select
          onChange={handleDate}
          name='year'
          className='h-5 w-[30%] appearance-none rounded border border-gray-200 px-3 outline-none hover:border-orange md:h-8 lg:h-10'
          value={value?.getFullYear() || date.year}
        >
          <option disabled>Năm</option>
          {range(1990, currentYear).map((item) => (
            <option className='py-3' value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className=''>{errorMessage}</div>
    </div>
  )
}
