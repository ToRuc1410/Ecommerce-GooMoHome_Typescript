import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// ------------------------------------check errors --------------------------------
export function isAxiousError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
// ------------------------------------check errors and isCodeErr --------------------------------
export function isAxiosStatusCodeError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiousError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
