import { User } from 'src/types/user.type'

// tạo 1 Event tổng
export const LocalStogareEventTarget = new EventTarget()

//======================== AccessTokens =============================
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
//======================== refreshToken =============================
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''
export const setRefreshTokenTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

//========================= Profile User =============================
export const getProfileUserFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileUserFromLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
// export const getDataPurchasesFromLS = () => {
//   const result = localStorage.getItem('dataPurchases')
//   return result ? JSON.parse(result) : null
// }
// export const setDataPurchasesFromLS = (dataPurchase: checkedPurchases) => {
//   localStorage.setItem('dataPurchases', JSON.stringify(dataPurchase))
// }
//======================== Clear tất cả trong localStorage
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')

  // tạo 1 event khi clearLS
  const clearLSEvent = new Event('clearLS')
  // bắn ra 1 event sẽ có 1 thằng lắng nghe event này để xử lý
  LocalStogareEventTarget.dispatchEvent(clearLSEvent)
}
