1.chia components

> Layout => RegisterLayout cho 2 elements {
> pages: [Login , Registter]
> } -->

2. xly lỗi

- trong submit form login,register
- axios lỗi chung ~ 4xx-5xx

3. useRouterElement chia router element

4. tạo component popop:hover khi hover vào đa ngôn ngữ, account, cart

Những thư viện sử dụng

- Framer Motion - Animation library cho React web
- React Popper or Floating Ui - thư viện giúp tính position đề view những tooltip, PopHov, Scroll up and down,...

5. tạo folder appContext để lưu trữ biến isAuthenticate nhằm mục đích kiểm tra User đăng nhập hay chưa từ localstogare mà muốn lấy giá trị access localstogare lấy từ file auth.ts

6.thuật toán đánh giá bằng sao

C:\xampp\htdocs\images
7.cơ chế phân trang
C:\xampp\htdocs\images

8. việc sử dụng link là params để đều hướng web mà k sdung state lợi ích là khi user 1
   copy link gửi cho 1 user 2 thì những cái filter hiện có của user 1 sẽ hiển thị đúng
   cho user 2 việc sử dụng này thì sẽ cải thiện dc mặt UX cho người dùng và đảm bảo cho những
   filter hiện có khi đổi trang
9. handle SortProductList active mặc định sẽ là mới nhất(createdAt)
   Lưu ý: có 1 vấn đề về sort theo giá(sortPrice) nếu người dùng chọn ['phổ biến', 'mới nhất','bán chạy']
   thì nó cần được chạy theo 1 luồng đó là:

- phổ biến nhất-> không phổ biến
- mới nhất nhất-> không mới nhất
- bán chạy nhất-> không bán chạy
  Thế nên khi chọn 1 trong ['phổ biến', 'mới nhất','bán chạy'] thì ta nên loại bỏ đi trường giá
  hoặc để cho giá từ cao đến thấp
