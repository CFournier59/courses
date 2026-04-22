import { API_ROUTES } from '../utils/constant.ts'
import axios from 'axios'
// -----------------------------
// Types
// -----------------------------

export interface Rating {
   userId: string
   grade: number
}

export interface Budget {
   _id?: string
   date: Date
   amount: Number
   classified: Boolean
}

// -----------------------------
// Helpers
// -----------------------------

function formatBudgets(budgetArray: Budget[]): Budget[] {
   return budgetArray.map((budget) => ({
      ...budget,
      id: budget._id,
   }))
}

// -----------------------------
// LocalStorage
// -----------------------------

export function storeInLocalStorage(token: string, userId: string): void {
   localStorage.setItem('token', token)
   localStorage.setItem('userId', userId)
}

export function getFromLocalStorage(key: string): string | null {
   return localStorage.getItem(key)
}

// -----------------------------
// Auth
// -----------------------------

export async function getAuthenticatedUser(): Promise<{
   authenticated: boolean
   user: { userId: string | null; token: string | null } | null
}> {
   const defaultReturn = { authenticated: false, user: null }

   try {
      const token = getFromLocalStorage('token')
      const userId = getFromLocalStorage('userId')

      if (!token) return defaultReturn

      return {
         authenticated: true,
         user: { userId, token },
      }
   } catch (err) {
      console.error('getAuthenticatedUser error:', err)
      return defaultReturn
   }
}

// -----------------------------
// Budgets API
// -----------------------------

export async function getBudgets(): Promise<Budget[]> {
   try {
      const response = await axios.get<Budget[]>(API_ROUTES.BUDGETS, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
      })
      return formatBudgets(response.data)
   } catch (err) {
      console.error(err)
      return []
   }
}

export async function getBook(id: string): Promise<Book | null> {
   try {
      const response = await axios.get<Book>(`${API_ROUTES.BOOKS}/${id}`)
      return { ...response.data, id: response.data._id }
   } catch (err) {
      console.error(err)
      return null
   }
}

export async function deleteBook(id: string): Promise<boolean> {
   try {
      await axios.delete(`${API_ROUTES.BOOKS}/${id}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
      })
      return true
   } catch (err) {
      console.error(err)
      return false
   }
}

export async function addBudget(data: Number): Promise<any> {
   console.log('adding budget with amount:', data)
   const userId = localStorage.getItem('userId') ?? ''

   const budget: Budget = {
      date: new Date(),
      amount: data,
      classified: false,
   }

   try {
      return await axios.post(API_ROUTES.BUDGETS, budget, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
      })
   } catch (err: any) {
      console.error(err)
      return { error: true, message: err.message }
   }
}

export async function updateBook(data: any, id: string): Promise<any> {
   const userId = localStorage.getItem('userId') ?? ''

   const book = {
      userId,
      title: data.title,
      author: data.author,
      year: Number(data.year),
      genre: data.genre,
   }

   let payload: FormData | typeof book

   if (data.file?.[0]) {
      payload = new FormData()
      payload.append('book', JSON.stringify(book))
      payload.append('image', data.file[0])
   } else {
      payload = book
   }

   try {
      return await axios.put(`${API_ROUTES.BOOKS}/${id}`, payload, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
      })
   } catch (err: any) {
      console.error(err)
      return { error: true, message: err.message }
   }
}
