import { Blogs, CategoriesBlogs } from 'src/types/blog.type'
import http from 'src/utils/http'

const URLBlogs = 'blogs'
const URLCategoriesBlogs = 'CategoriesBlogs'
const blogApi = {
  getCategoriesBlogs() {
    return http.get<CategoriesBlogs[]>(URLCategoriesBlogs)
  },
  getBlogs() {
    return http.get<Blogs[]>(URLBlogs)
  },
  getBlogsByCategory(categoryBlogs: string) {
    return http.get(`${URLBlogs}?category=${categoryBlogs}`)
  },
  getBlogDetail(id: string) {
    return http.get(`${URLBlogs}/${id}`)
  }
}

export default blogApi
