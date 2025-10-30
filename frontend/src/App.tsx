import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'sonner'

import ProtectedRoute from '~/components/auth/ProtectedRoute'
import SignInPage from '~/pages/SignInPage'
import SignUpPage from '~/pages/SignUpPage'
import ChatAppPage from '~/pages/ChatAppPage'

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<ChatAppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
