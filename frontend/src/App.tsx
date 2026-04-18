import { HashRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
   return (
      <HashRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </HashRouter>
   )
}
