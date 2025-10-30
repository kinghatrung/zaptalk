import Logout from '~/components/auth/Logout'
import { useAuthStore } from '~/stores/useAuthStore'

function ChatAppPage() {
  // bởi vì useAuthStore đang theo dõi các state trong stores nên nếu state
  // khác thay đổi thì cả component sẽ re-render lại, nên dùng cú pháp sau để tránh việc xảy ra như trên
  const user = useAuthStore((s) => s.user)

  console.log(user)

  return (
    <div>
      <p>{user?.displayName}</p>
      <Logout />
    </div>
  )
}

export default ChatAppPage
