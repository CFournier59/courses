import { HashRouter, Routes, Route } from 'react-router'
import { useState } from 'react'
import Home from './pages/Home'
import type { SignInResponse } from './pages/Login'
import Login from './pages/Login'

export default function App() {
   const [user, setUser] = useState<SignInResponse | null>(null)
   return (
      <HashRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
         </Routes>
      </HashRouter>
   )
}
