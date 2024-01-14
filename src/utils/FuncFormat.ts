/// sử dụng thư viện sẵn có của javascript là new Intl.NumberFormat

// import config from 'src/constants/config'
import user from 'src/assets/img_user/default_user.png'
import { Product } from 'src/types/product.type'

interface RenderCheckOut {
  buy_count: number
  product: Product
}
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
// Xử lý URL cho name thân thiện để SEO trên google
export const generateURLName = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-b_${id}`
}

// get Id từ string URL
export const getIdFromURLNameAndId = (nameId: string) => {
  const arr = nameId.split('-i_')
  return arr[arr.length - 1]
}
// get Id từ string URL
export const getBlogId = (nameId: string) => {
  const arr = nameId.split('-b_')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${avatarName}` : user)

// tính trung bình cân nặng dựa trên kích thước và số lượng
export const calculateTotalWeight = (products: RenderCheckOut[]) => {
  let totalWeight = 0

  products.forEach((product) => {
    totalWeight += (product.product.height * product.product.length * product.product.width * product.buy_count) / 5000
  })

  return totalWeight
}

// làm tròn kg->gram
export const convertKgToGram = (kg: number) => {
  const gramValue = Math.round(kg * 1000) // 1 kg = 1000 gram
  return gramValue
}

//
// Tính tổng kích thước của các sản phẩm
export const calculateTotalDimensions = (products: RenderCheckOut[]) => {
  // Mảng lưu trữ các category khác nhau
  // Tính tổng chiều dài và chiều rộng của các sản phẩm có category khác nhau
  let maxLength = 0
  let maxWidth = 0
  let totalHeight = 0

  products.forEach((product) => {
    if (product.product.length > maxLength || product.product.width > maxWidth) {
      maxLength = product.product.length
      maxWidth = product.product.width
    }

    totalHeight += product.product.height * product.buy_count
  })
  return {
    maxLength,
    maxWidth,
    totalHeight
  }
}
export const removeCommas = (number: string) => {
  // Loại bỏ tất cả dấu phẩy từ chuỗi
  return number.replace(/,/g, '')
}
