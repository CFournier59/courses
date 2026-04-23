import { API_ROUTES } from '../utils/constant.ts'
import axios from 'axios'
// -----------------------------
// Types
// -----------------------------

export interface Budget {
   _id?: string
   date: Date
   amount: number
   classified: Boolean
}

export interface Transaction {
   _id?: string
   budgetId: string
   userName: string
   date: Date
   description: string
   amount: number
}

interface AddTransactionInput {
   budgetId: string
   userName: string
   description: string
   amount: number
}

// -----------------------------
// Helpers
// -----------------------------

function formatModel<T extends { _id?: string }>(modelArray: T[]): T[] {
   return modelArray.map((model) => ({
      ...model,
      id: model._id,
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
      return formatModel<Budget>(response.data)
   } catch (err) {
      console.error(err)
      return []
   }
}

export async function addBudget(data: number): Promise<any> {
   console.log('adding budget with amount:', data)

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

export async function classifyBudget(budgetId: string): Promise<any> {
   try {
      return await axios.put(
         `${API_ROUTES.BUDGETS}/${budgetId}`,
         {},
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
               'Content-Type': 'application/json',
            },
         },
      )
   } catch (err: any) {
      console.error(err)
      return { error: true, message: err.message }
   }
}

// -----------------------------
// Transactions API
// -----------------------------

export async function getTransactions(
   budgetId: string,
): Promise<Transaction[]> {
   try {
      const response = await axios.get<Transaction[]>(
         `${API_ROUTES.TRANSACTIONS}/${budgetId}`,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         },
      )
      return formatModel<Transaction>(response.data)
   } catch (err) {
      console.error(err)
      return []
   }
}

export async function addTransaction(data: AddTransactionInput): Promise<any> {
   console.log('adding transaction with amount:', data)

   const transaction: Transaction = {
      budgetId: data.budgetId, // À remplir avec l'ID du budget associé
      userName: data.userName, // À remplir avec le nom de l'utilisateur
      date: new Date(),
      description: data.description, // À remplir avec la description de la transaction
      amount: data.amount,
   }

   try {
      return await axios.post(API_ROUTES.TRANSACTIONS, transaction, {
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

export async function deleteTransaction(id: string): Promise<boolean> {
   try {
      await axios.delete(`${API_ROUTES.TRANSACTIONS}/${id}`, {
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
