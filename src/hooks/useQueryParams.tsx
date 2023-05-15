import { useSearchParams } from 'react-router-dom'

///=== hook: lấy Params trên URL
export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
