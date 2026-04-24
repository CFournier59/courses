import { useState, useEffect } from 'react'
import { getAuthenticatedUser } from './common'

// -----------------------------
// useUser
// -----------------------------

interface AuthenticatedUser {
   userId: string | null
   token: string | null
}

interface UseUserReturn {
   connectedUser: AuthenticatedUser | null
   auth: boolean
   userLoading: boolean
}

export function useUser(): UseUserReturn {
   const [connectedUser, setConnectedUser] = useState<AuthenticatedUser | null>(
      null,
   )
   const [auth, setAuth] = useState(false)
   const [userLoading, setUserLoading] = useState(true)

   useEffect(() => {
      async function getUserDetails() {
         const { authenticated, user } = await getAuthenticatedUser()
         setConnectedUser(user)
         setAuth(authenticated)
         setUserLoading(false)
      }
      getUserDetails()
   }, [])

   return { connectedUser, auth, userLoading }
}
