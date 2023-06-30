import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_FORGOTPASS = 'forgot-password'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_REFRESH_PASSWORD = 'reset-password'

interface Body {
  email: string
  password: string
}
// AuthResponse quy định kiểu trả về
const authApi = {
  registerAccount(body: Body) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  loginAccount(body: Body) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  },
  forgotPass(body: string) {
    return http.post(URL_FORGOTPASS, { email: body })
  },
  resetPassword(body: { token: string; password: string }) {
    return http.post(URL_REFRESH_PASSWORD, body)
  }
}
export default authApi
