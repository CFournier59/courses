import { useState, useEffect } from 'react'
import { getAuthenticatedUser, getBestRatedBooks } from './common'
import type { Book } from './common'

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

// -----------------------------
// useBestRatedBooks
// -----------------------------

interface UseBestRatedBooksReturn {
   bestRatedBooks: Book[]
}

export function useBestRatedBooks(): UseBestRatedBooksReturn {
   const [bestRatedBooks, setBestRatedBooks] = useState<Book[]>([])

   useEffect(() => {
      async function getRatedBooks() {
         const books = await getBestRatedBooks()
         setBestRatedBooks(books)
      }
      getRatedBooks()
   }, [])

   return { bestRatedBooks }
}

// -----------------------------
// useFilePreview
// -----------------------------

type FileInput = FileList | null | undefined

export function useFilePreview(file: FileInput) {
   const [imgSrc, setImgSrc] = useState<string | null>(null)

   useEffect(() => {
      if (file && file.length > 0) {
         const newUrl = URL.createObjectURL(file[0])

         if (newUrl !== imgSrc) {
            setImgSrc(newUrl)
         }

         return () => {
            URL.revokeObjectURL(newUrl)
         }
      }
   }, [file?.[0]])

   return [imgSrc, setImgSrc] as const
}
