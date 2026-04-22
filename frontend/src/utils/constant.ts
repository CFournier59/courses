export const API_URL = 'http://localhost:4000'

export const API_ROUTES = {
   SIGN_IN: `${API_URL}/api/auth/login`,
   BUDGETS: `${API_URL}/api/budgets`,
   TRANSACTIONS: `${API_URL}/api/transactions`,
   BEST_RATED: `${API_URL}/api/budgets/bestrating`,
} as const

export const APP_ROUTES = {
   SIGN_UP: '/Inscription',
   SIGN_IN: '/Connexion',
   ADD_BUDGET: '/Ajouter',
   BUDGET: '/budget/:id',
   UPDATE_BUDGET: '/budget/modifier/:id',
} as const
