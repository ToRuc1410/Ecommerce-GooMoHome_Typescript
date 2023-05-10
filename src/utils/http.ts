/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileUserFromLS } from './auth'
import path from 'src/constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type0': 'application/json'
      }
    })

    // Thêm một bộ đón chặn request, Làm gì đó trước khi request dược gửi đi
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        // Làm gì đó với lỗi request
        return Promise.reject(error)
      }
    )
    // Thêm một bộ đón chặn response,Làm gì đó với dữ liệu response
    this.instance.interceptors.response.use(
      (response) => {
        // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
        // nhận url trả về và kiểm tra url và lưu vào localStorage
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          // lưu access_token và priofileUser vào localStogare
          setAccessTokenToLS(this.accessToken)
          setProfileUserFromLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }

        return response
      },
      function (error) {
        // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
        // Làm gì đó với lỗi response
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || 'Máy chủ đang quá tải vui lòng thử lại sau'
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
