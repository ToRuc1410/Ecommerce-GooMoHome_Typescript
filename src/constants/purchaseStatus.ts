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
