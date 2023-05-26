/// sử dụng thư viện sẵn có của javascript là new Intl.NumberFormat

import config from 'src/constants/config'
import user from 'src/assets/img_user/default_user.png'

// format giá tiền
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}
// format số lượng bán hàng
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
// Format những kí tự đặc biệt có thể có trên URL
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

// Xử lý URL cho name thân thiện để SEO trên google
export const generateURLNameAndId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i_${id}`
}

// get Id từ string URL
export const getIdFromURLNameAndId = (nameId: string) => {
  const arr = nameId.split('-i_')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseURL}images/${avatarName}` : user)
