import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/ruleValidateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import path from 'src/constants/path'

type FormSearch = Pick<Schema, 'searchProduct'>
const nameSchema = schema.pick(['searchProduct'])
export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormSearch>({
    defaultValues: {
      searchProduct: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()
  const onSubmitSearch = handleSubmit((data) => {
    const configUrl = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.searchProduct
          },
          ['order', 'sort_by']
        )
      : omit({
          ...queryConfig,
          name: data.searchProduct
        })
    navigate({
      pathname: path.home,
      search: createSearchParams(configUrl).toString()
    })
  })
  return { onSubmitSearch, register }
}
