import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { ErrorResponse } from 'src/types/utils.type'

// ------------------------------------check errors --------------------------------
export function isAxiousError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
// ------------------------------------check errors and isCodeErr --------------------------------
export function isAxiosStatusCodeError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiousError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
// ------------------------------------check errors is ERROR.Unauthorized = 401 --------------------------------
export function isAxiosUnauthorizedError<UnauthorizedFormError>(
  error: unknown
): error is AxiosError<UnauthorizedFormError> {
  return isAxiousError(error) && error.response?.status === HttpStatusCode.Unauthorized
}
// ------------------------------------check errors is ERROR.Unauthorized = 401 --------------------------------
export function isAxiosExpiredTokenError<UnauthorizedFormError>(
  error: unknown
): error is AxiosError<UnauthorizedFormError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}
