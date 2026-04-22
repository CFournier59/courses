import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Budget } from '../../lib/common'

interface HomeProps {
   budgets: Budget[]
}

export default function Home({ budgets }: HomeProps) {
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
               <h2>Budget en cours</h2>
               <p>Montant : {currentBudget!.amount.toFixed(2)}</p>
            </div>
         )}
      </>
   )
}
