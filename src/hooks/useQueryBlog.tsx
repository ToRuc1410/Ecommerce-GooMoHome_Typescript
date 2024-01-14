import { useQuery } from '@tanstack/react-query'
import blogApi from 'src/apis/blog.api'

const useBlogsQuery = (selectedCategory = '') => {
  return useQuery({
    queryKey: ['blogs', selectedCategory],
    queryFn: () => {
      if (selectedCategory === '') {
        return blogApi.getBlogs()
      } else {
        return blogApi.getBlogsByCategory(selectedCategory)
      }
    }
  })
}

export default useBlogsQuery
