import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { API_ROUTES, APP_ROUTES } from '../../utils/constant'
import { useUser } from '../../lib/customHooks'
import { storeInLocalStorage } from '../../lib/common'

// Type du user renvoyé par l'API
interface SignInResponse {
   token: string
   userId: string
   email: string
}

interface SignInProps {
   setUser: (user: SignInResponse) => void
}

export default function SignIn({ setUser }: SignInProps) {
   const navigate = useNavigate()
   const { connectedUser, auth } = useUser()

   // Redirection si déjà connecté
   useEffect(() => {
      if (connectedUser || auth) {
         navigate(APP_ROUTES.SIGN_IN)
      }
   }, [connectedUser, auth, navigate])

   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [notification, setNotification] = useState({
      error: false,
      message: '',
   })

   const signIn = async () => {
      try {
         setIsLoading(true)

         const response = await axios.post<SignInResponse>(API_ROUTES.SIGN_IN, {
            name,
            password,
         })

         if (!response?.data?.token) {
            setNotification({
               error: true,
               message: 'Une erreur est survenue',
            })
            console.error('Erreur lors de la connexion :', response)
            return
         }

         // Stockage du token
         storeInLocalStorage(response.data.token, response.data.userId)

         // Mise à jour du user global
         setUser(response.data)

         // Redirection
         navigate('/')
      } catch (err) {
         console.error('Erreur lors du sign-in :', err)
         setNotification({
            error: true,
            message: 'Identifiants incorrects',
         })
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div>
         <h1>Connexion</h1>

         {notification.error && (
            <p style={{ color: 'red' }}>{notification.message}</p>
         )}

         <input
            type="text"
            placeholder="nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />

         <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />

         <button onClick={signIn} disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
         </button>
      </div>
   )
}
