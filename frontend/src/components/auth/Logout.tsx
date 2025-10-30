import { useNavigate } from 'react-router'

import { Button } from '~/components/ui/button'
import { useAuthStore } from '~/stores/useAuthStore'

function Logout() {
  const { signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/signin')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Button className='cursor-pointer' onClick={handleLogout}>
      Đăng xuất
    </Button>
  )
}

export default Logout
