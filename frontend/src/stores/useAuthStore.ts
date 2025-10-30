import { create } from 'zustand'
import { toast } from 'sonner'

import type { AuthState } from '~/types/store'
import { authService } from '~/services/authSevice'

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => {
    set({ accessToken: null, user: null, loading: false })
  },

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true })

      await authService.signUp(username, password, email, firstName, lastName)

      toast.success('Đăng ký thành công.')
    } catch (error) {
      console.error(error)
      toast.error('Đăng ký không thành công.')
    } finally {
      set({ loading: false })
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true })
      const { accessToken } = await authService.signIn(username, password)
      set({ accessToken })
      await get().fetchMe()
      toast.success('Đăng nhập thành công.')
    } catch (error) {
      console.error(error)
      toast.error('Đăng nhập không thành công.')
    } finally {
      set({ loading: false })
    }
  },

  signOut: async () => {
    try {
      get().clearState()
      await authService.signOut()

      toast.success('Đăng xuất thành công.')
    } catch (error) {
      console.error(error)
      toast.error('Đăng xuất không thành công.')
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true })
      const user = await authService.fetchMe()
      set({ user })
    } catch (error) {
      console.error(error)
      set({ user: null, accessToken: null })
      toast.error('lỗi khi lấy dữ liệu người dùng')
    } finally {
      set({ loading: false })
    }
  },

  refresh: async () => {
    try {
      set({ loading: true })

      const { user } = get()

      const accessToken = await authService.refresh()

      set({ accessToken })

      if (!user) await get().fetchMe()
    } catch (error) {
      console.log(error)
      toast.error('Phiên đã hết hạn, vui lòng đăng nhập lại.')
      get().clearState()
    } finally {
      set({ loading: false })
    }
  }
}))
