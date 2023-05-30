/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileUserFromLS,
  setRefreshTokenTokenToLS
} from './auth'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utilsErrForm'
import { ErrorResponse } from 'src/types/utils.type'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type0': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 ngày
        'expire-refresh-token': 60 * 60 * 24 * 30 // 30 ngày
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
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          // lưu access_token, refresh_token và priofileUser vào localStogare
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenTokenToLS(this.refreshToken)
          setProfileUserFromLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }

        return response
      },
      (error: AxiosError) => {
        // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
        // Làm gì đó với lỗi response
        // Và chỉ toast những lỗi không phải 422 và 401

        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || 'Máy chủ đang quá tải vui lòng thử lại sau'
          toast.error(message)
        }
        // lỗi Unauthorized=401 có nhiều trường hợp xảy ra:
        // - lỗi do Token hết hạn =>  if (isAxiosUnauthorizedError(error)) {}

        // nếu là lỗi 401 Unauthorized
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          //Trường hợp: - lỗi do Token hết hạn và request đó k phải là request refesh token
          // thì ta mới tiên hành gọi refesh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // thì chúng ta sẽ tiến hành gọi lại refesh token
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefeshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 5000)
                })
            return this.refreshTokenRequest.then((accessToken) => {
              // chỗ này nghĩa là chúng ta gọi lại request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, Authorization: accessToken } })
            })
          }
          // - lỗi do Token không đúng
          // - lỗi do không truyền Token,
          // - lỗi truyền Token nhưng bị failer
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefeshToken() {
    return (
      this.instance
        .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
          refresh_token: this.refreshToken
        })
        // refresh_token thành công
        .then((res) => {
          const { access_token } = res.data.data
          setAccessTokenToLS(access_token)
          this.accessToken = access_token
          return access_token
        })
        // refresh_token thất bại thì cho nó logout và ném lỗi ra
        .catch((error) => {
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          throw error
        })
    )
  }
}
const http = new Http().instance
export default http
