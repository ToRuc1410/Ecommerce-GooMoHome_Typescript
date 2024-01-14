export interface CategoriesBlogs {
  _id: string
  title: string
}
export interface Blogs {
  _id: string
  title: string
  contentText: string
  categoriesBlog: {
    _id: string
    title: string
  }
  img: {
    path: string
  }
  order: number
  publishDate: string
}
