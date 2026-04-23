import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { API_ROUTES, APP_ROUTES } from '../../utils/constant'
import { useUser } from '../../lib/customHooks'
import { storeInLocalStorage } from '../../lib/common'

// Type du user renvoyé par l'API
export interface SignInResponse {
   token: string
   userId: string
   email: string
}

interface SignInProps {
   setUser: (user: SignInResponse) => void
   setToken: (token: string) => void
}

export default function Login({ setUser, setToken }: SignInProps) {
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
         setToken(response.data.token)

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
      <div className="mx-2">
         <h1 className="p-8">connexion requise</h1>

         {notification.error && (
            <p style={{ color: 'red' }}>{notification.message}</p>
         )}

         <div className="flex items-center mt-6">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               className="size-6 text-almond"
            >
               <path
                  fill="currentColor"
                  d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
               />
            </svg>
            <input
               type="text"
               placeholder="nom"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="bg-almond text-charcoal w-3/4 ml-4 h-10 text-center font-bold rounded-lg"
            />
         </div>

         <div className="flex items-center mt-6">
            <svg
               width="25"
               height="25"
               xmlns="http://www.w3.org/2000/svg"
               fillRule="evenodd"
               clipRule="evenodd"
               className="text-almond"
            >
               <path
                  fill="currentColor"
                  d="M12.804 9c1.038-1.793 2.977-3 5.196-3 3.311 0 6 2.689 6 6s-2.689 6-6 6c-2.219 0-4.158-1.207-5.196-3h-3.804l-1.506-1.503-1.494 1.503-1.48-1.503-1.52 1.503-3-3.032 2.53-2.968h10.274zm7.696 1.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"
               />
            </svg>
            <input
               type="password"
               placeholder="Mot de passe"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="bg-almond text-charcoal w-3/4 ml-4 h-10 text-center font-bold rounded-lg"
            />
         </div>
         <div className="w-fit mx-auto mt-6">
            <button
               onClick={signIn}
               disabled={isLoading}
               className="mx-auto border-4 border-bluue font-bold rounded-xl p-2 text-canary"
            >
               {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
         </div>
      </div>
   )
}
