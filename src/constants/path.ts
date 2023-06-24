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
  productDetail: ':nameId',
  cart: '/cart',
  checkout: '/checkout',
  orderDetail: '/user/order-detail'
} as const
export default path
