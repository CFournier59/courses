import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getFromLocalStorage } from '../../lib/common'

export default function Home() {
   const navigate = useNavigate()
   const token = getFromLocalStorage('token')

   useEffect(() => {
      if (!token) {
         navigate('/login')
      }
   }, [token, navigate])

   return <h1>Hello World</h1>
}
