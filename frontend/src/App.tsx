import { Routes, Route, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import type { SignInResponse } from './pages/Login'
import { getFromLocalStorage, getBudgets, type Budget } from './lib/common'

import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
   const [token, setToken] = useState<string | null>(
      getFromLocalStorage('token'),
   )
   const [user, setUser] = useState<SignInResponse | null>(null)
   const [budgets, setBudgets] = useState<Budget[]>([])

   const navigate = useNavigate()

   useEffect(() => {
      if (!token) {
         navigate('/login')
         return
      }
      // Si token existe → charger les données
      async function loadData() {
         const budgetsData = await getBudgets()
         setBudgets(budgetsData)
      }
      loadData()
      console.log(budgets)
   }, [token, navigate])

   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route
            path="/login"
            element={<Login setUser={setUser} setToken={setToken} />}
         />
      </Routes>
   )
}
