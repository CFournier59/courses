import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Budget } from '../../lib/common'

import BudgetTable from '../../components/BudgetTable'

interface HomeProps {
   budgets: Budget[]
}

export default function Home({ budgets }: HomeProps) {
   const currentBudget: Budget | undefined = budgets.find(
      (budget) => budget.classified === false,
   )

   if (currentBudget) {
      console.log('Budget en cours :', currentBudget)
   }

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
               <BudgetTable budget={currentBudget} />
            </div>
         )}
      </>
   )
}
