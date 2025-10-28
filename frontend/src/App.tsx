import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'sonner'

import SignInPage from '~/pages/SignInPage'
import SignUpPage from '~/pages/SignUpPage'
import ChatAppPage from '~/pages/ChatAppPage'

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<ChatAppPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
