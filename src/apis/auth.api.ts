import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

interface Body {
  email: string
  password: string
}
// AuthResponse quy định kiểu trả về
const authApi = {
  registerAccount(body: Body) {
    return http.post<AuthResponse>(path.register, body)
  },
  loginAccount(body: Body) {
    return http.post<AuthResponse>(path.login, body)
  },
  logout() {
    return http.post(path.logout)
  }
}
export default authApi
