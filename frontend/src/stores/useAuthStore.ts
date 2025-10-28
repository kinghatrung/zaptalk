import { create } from 'zustand'
import { toast } from 'sonner'

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true })
    } catch (error) {
      console.error(error)
      toast.error('Đăng ký không thành công.')
    } finally {
      set({ loading: false })
    }
  }
}))
