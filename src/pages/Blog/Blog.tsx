const posts = [
  {
    id: 1,
    title: 'Sàn nhựa Giá bao nhiêu',
    href: '#',
    description:
      'Nói tới sàn nhựa pvc giả gỗ. Người ta nghĩ ngay tới sàn nhựa pvc, wpc và sàn nhựa spc. Đây là loại sàn nhựa đều có công năng sử dụng giống nhau. Đặc tính của chúng lại khách nhau. Ứng dụng của 3 loại vật liệu này là để lát sàn nhà, ốp lát, trang trí nội ngoại thất. Mỗi loại vật liệu đều có những đặc tính và công năng sử dụng riêng. Chỉ có một mục đích riêng là sử dụng cho hoàn thiện nội thất. Báo giá sàn nhựa spc và sàn nhựa pvc tại Hà Nội.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    img: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1800,h=1080,fit=crop/YbNbPPqn2EfwxjP7/z3205596566056_088_151ae154c7bde7dd2ce676f0902f6356-1-YBgEQvVDO9CxOjk1.jpg'
  },
  {
    id: 2,
    title: 'Sàn nhựa gia vân gỗ sẵn keo',
    href: '#',
    description:
      'là một lựa chọn phổ biến và thú vị cho việc trang trí nội thất. Với sự kết hợp hoàn hảo giữa tính năng và vẻ đẹp tự nhiên của gỗ, nó mang đến một không gian sống hiện đại và sang trọng. Để hiểu rõ hơn về thành phần và đặc điểm của loại sàn này, chúng ta sẽ khám phá các yếu tố quan trọng của nó.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    img: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1800,h=1080,fit=crop/YbNbPPqn2EfwxjP7/z3205596566056_083_3b70da6dc97549ebf9e86a0b3eb3647b-Aq2Z5Rvy3XfJavLo.jpg'
  },
  {
    id: 3,
    title: 'Tấm Ốp Tường PVC',
    href: '#',
    description:
      'Tấm ốp tường PVC - Lựa chọn tuyệt vời cho trang trí và bảo vệ tường. Tấm ốp tường PVC đã trở thành một lựa chọn phổ biến cho việc trang trí và bảo vệ tường trong các không gian nội thất. Với đa dạng về màu sắc, kiểu dáng và tính năng ưu việt, chúng đã thu hút sự quan tâm của nhiều người. Việc lắp đặt tấm ốp tường PVC rất dễ dàng nhờ vào hệ thống khóa và lắp ráp thông minh. Bạn có thể tự mình thực hiện công việc này mà không cần đến sự trợ giúp của thợ làm. Điều này không chỉ tiết kiệm thời gian mà còn giúp bạn tận hưởng niềm vui của việc tự tay trang trí không gian sống của mình.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    img: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1800,h=1080,fit=crop/YbNbPPqn2EfwxjP7/z4258446398328_29744da5c8e5144891dbea8cb90a117c-dOqMOR1eE9hR7vob.jpg'
  },
  {
    id: 4,
    title: 'Tấm ốp tường nano',
    href: '#',
    description:
      'Trong việc trang trí nội thất, tấm ốp tường Nano đang trở thành một sự lựa chọn phổ biến cho những người muốn tạo ra một không gian sống đẹp mắt và hiện đại. Với vẻ đẹp tự nhiên và khả năng chống thấm, tấm ốp tường Nano không chỉ mang lại sự thẩm mỹ mà còn bảo vệ tường khỏi ảnh hưởng của môi trường. Hãy cùng khám phá chi tiết về kích thước và quy trình thi công tấm ốp tường Nano.Kích thước: Tấm ốp tường Nano có nhiều kích thước khác nhau để phù hợp với các khu vực trang trí khác nhau. Thông thường, kích thước phổ biến của tấm ốp tường Nano là 40cm x 290cm hoặc 40cm x 300cm. Việc có nhiều kích thước khác nhau giúp tạo ra sự linh hoạt trong việc lắp đặt và tạo các mẫu trang trí độc đáo.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    img: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1800,h=1080,fit=crop/YbNbPPqn2EfwxjP7/z4258446376319_c2ab5d165758196dafee0b4a0c44a126-mk3Lv47E35i9alWK.jpg'
  }
  // More posts...
]

export default function Blog() {
  return (
    <div className='bg-white py-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Tin Tức</h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>Những bài viết mới nhất.</p>
        </div>
        <div className='mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {posts.map((post) => (
            <article key={post.id} className='flex max-w-xl flex-col items-start justify-between'>
              <div className='flex items-center gap-x-4 text-xs'>
                <time dateTime={post.datetime} className='text-gray-500'>
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
                >
                  {post.category.title}
                </a>
              </div>
              <div className='group relative flex'>
                <img src={post.img} alt='' className='mr-2 mt-4 h-20 w-20 items-center justify-center bg-gray-50' />
                <div className=''>
                  <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <a href={post.href}>
                      <span className='absolute inset-0' />
                      {post.title}
                    </a>
                  </h3>
                  <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>{post.description}</p>
                </div>
              </div>
              {/* <div className='relative mt-8 flex items-center gap-x-4'>
                <img src={post.author.imageUrl} alt='' className='h-10 w-10 rounded-full bg-gray-50' />
                <div className='text-sm leading-6'>
                  <p className='font-semibold text-gray-900'>
                    <a href={post.author.href}>
                      <span className='absolute inset-0' />
                      {post.author.name}
                    </a>
                  </p>
                  <p className='text-gray-600'>{post.author.role}</p>
                </div>
              </div> */}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
