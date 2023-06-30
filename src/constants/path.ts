const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  products: '/products',
  cs1: '/chinh-sach-bao-hanh',
  cs2: '/chinh-sach-bao-mat-thong-tin',
  cs3: '/chinh-sach-doi-tra-hoan-tien',
  productDetail: ':nameId',
  cart: '/cart',
  checkout: '/checkout',
  orderDetail: '/user/order-detail',
  forgotPassWord: '/forgot-password',
  resetPassword: '/reset-password/:tokenPassword'
} as const
export default path
