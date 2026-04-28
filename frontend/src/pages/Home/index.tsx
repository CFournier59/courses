import { useState } from 'react'
import { Link } from 'react-router'
import type { Budget } from '../../lib/common'

import BudgetTable from '../../components/BudgetTable'
import AddTransaction from '../../components/AddTransaction'

interface HomeProps {
   budgets: Budget[]
   setBudgets: (budgets: Budget[]) => void
   loading: boolean
}

export default function Home({ budgets, setBudgets, loading }: HomeProps) {
   const [AddedTsx, setAddedTsx] = useState(0)

   const currentBudget: Budget | undefined = budgets.find(
      (budget) => budget.classified === false,
   )

   if (loading) {
      return <p className="p-8">ça arrive...</p>
   }

   return (
      <div className="pb-30">
         {!currentBudget ? (
            <div>
               <h1 className="p-8">Aucun budget en cours</h1>
               <Link to="/add-budget" className="block mt-20">
                  <button className="mx-auto border-4 border-bluue p-2 rounded-xl flex items-center gap-2">
                     <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-canary size-8"
                     >
                        <path
                           fill="currentColor"
                           d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-9.75 7.252v-3.5c0-.414.336-.75.75-.75s.75.336.75.75v3.5h3.5c.414 0 .75.336.75.75s-.336.75-.75.75h-3.5v3.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.5h-3.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75z"
                           fillRule="nonzero"
                        />
                     </svg>
                     <p className="text-lg font-bold text-canary">budget</p>
                  </button>
               </Link>
            </div>
         ) : (
            <div>
               <BudgetTable
                  budget={currentBudget}
                  addedTsx={AddedTsx}
                  setBudgets={setBudgets}
               />
               <AddTransaction
                  budgetId={currentBudget._id!}
                  onTransactionAdded={() => {
                     setAddedTsx((prev) => prev + 1)
                  }}
               />
            </div>
         )}
      </div>
   )
}
