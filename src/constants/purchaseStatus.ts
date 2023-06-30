export const purchasesStatus = {
  inCart: -1
} as const

export const detailStatus = {
  all: 0,
  waitForConfirmation: 1,
  waitForGetting: 2,
  inProgress: 3,
  delivered: 4,
  cancelled: 5
} as const

export const orderStatus: {
  [key: number]: string
} = {
  0: 'Tất cả Sản Phẩm',
  1: 'Chờ xác nhận',
  2: 'đang lấy hàng',
  3: 'đang vận chuyển',
  4: 'đã được giao',
  5: 'đã bị hủy'
}

export const colorStatus: {
  [key: number]: string
} = {
  0: 'text-gray-500',
  1: 'text-black font-bold',
  2: 'text-yellow-500',
  3: 'text-green-500',
  4: 'text-blue-500',
  5: 'text-red-500'
}
