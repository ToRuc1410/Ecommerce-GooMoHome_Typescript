import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'email' | 'createdAt' | 'updatedAt' | 'roles'> {
  password?: string
  newPassword?: string
}

const userAPI = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return http.post<SuccessResponse<any>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
export default userAPI
