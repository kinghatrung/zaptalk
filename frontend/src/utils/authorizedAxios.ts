import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { toast } from 'sonner'

const authorizedAxiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  timeout: 1000 * 60 * 10
})

// Request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError<{ message?: string }>) => {
    if (error.response && error.response.status !== 410) {
      toast.error(error.response.data?.message || 'Có lỗi xảy ra')
    }
    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
