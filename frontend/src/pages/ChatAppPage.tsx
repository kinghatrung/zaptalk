import { toast } from 'sonner'
import Logout from '~/components/auth/Logout'
import { Button } from '~/components/ui/button'
import api from '~/lib/axios'
import { useAuthStore } from '~/stores/useAuthStore'

function ChatAppPage() {
  // bởi vì useAuthStore đang theo dõi các state trong stores nên nếu state
  // khác thay đổi thì cả component sẽ re-render lại, nên dùng cú pháp sau để tránh việc xảy ra như trên
  const user = useAuthStore((s) => s.user)

  const handleTest = async () => {
    try {
      await api.get('/users/test', { withCredentials: true })
      toast.success('API test thành công')
    } catch (err) {
      console.error(err)
      toast.error('API test không thành công')
    }
  }

  return (
    <div>
      <p>{user?.displayName}</p>
      <Logout />
      <Button onClick={handleTest}>test</Button>
    </div>
  )
}

export default ChatAppPage
