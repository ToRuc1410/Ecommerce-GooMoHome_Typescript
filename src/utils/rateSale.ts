// tính Hàm Phần Trăm giá giảm của sản phẩm
// original giá gốc, sale giá giảm
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'
