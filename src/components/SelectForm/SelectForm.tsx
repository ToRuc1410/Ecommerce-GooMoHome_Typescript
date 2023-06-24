import { Select, Option } from '@material-tailwind/react'
import React, { useState } from 'react'

interface Props {
  dataAddress: {
    ProvinceName: string
    ProvinceID: number | string
  }[]
  text: string
}

export default function SelectForm({ dataAddress, text }: Props) {
  const [selectedValue, setSelectedValue] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChoose = (value: any) => {
    console.log(value)
    setSelectedValue(value)
  }
  return (
    <Select
      className='relative w-40 text-[8px] md:text-sm lg:w-full lg:text-sm'
      label={text}
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 }
      }}
      onChange={handleChoose}
    >
      {dataAddress.map((item, index) => (
        <Option key={index} value={String(item.ProvinceID)}>
          {item.ProvinceName}
        </Option>
      ))}
    </Select>
  )
}
