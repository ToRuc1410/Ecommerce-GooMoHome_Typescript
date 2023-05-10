import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

interface Body {
  email: string
  password: string
}
// AuthResponse quy định kiểu trả về
export const registerAccount = (body: Body) => http.post<AuthResponse>(path.register, body)
export const loginAccount = (body: Body) => http.post<AuthResponse>(path.login, body)
export const logout = () => http.post(path.logout)
