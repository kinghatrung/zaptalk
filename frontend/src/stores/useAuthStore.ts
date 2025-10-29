import { create } from 'zustand'
import { toast } from 'sonner'

import type { AuthStore } from '~/types/store'
import { authService } from '~/services/authSevice'

export const useAuthStore = create<AuthStore>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

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
  }
}))
