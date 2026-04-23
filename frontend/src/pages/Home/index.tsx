import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Budget } from '../../lib/common'

import BudgetTable from '../../components/BudgetTable'
import AddTransaction from '../../components/AddTransaction'

interface HomeProps {
   budgets: Budget[]
   setBudgets: (budgets: Budget[]) => void
}

export default function Home({ budgets, setBudgets }: HomeProps) {
   const [AddedTsx, setAddedTsx] = useState(0)

   const currentBudget: Budget | undefined = budgets.find(
      (budget) => budget.classified === false,
   )

   return (
      <>
         <h1>Home</h1>
         {!currentBudget ? (
            <div>
               <p>Aucun budget en cours</p>
               <Link to="/add-budget">
                  <button>Ajouter un budget</button>
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
      </>
   )
}
