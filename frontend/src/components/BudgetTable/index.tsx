import { useEffect, useState } from 'react'
import type { Budget, Transaction } from '../../lib/common'
import { getTransactions } from '../../lib/common'
import ClassifyBudget from '../ClassifyBudget'

interface BudgetTableProps {
   budget: Budget
   addedTsx: number
   setBudgets: (budgets: Budget[]) => void
}

export default function BudgetTable({
   budget,
   addedTsx,
   setBudgets,
}: BudgetTableProps) {
   const [transactions, setTransactions] = useState<Transaction[]>([])

   useEffect(() => {
      const fetchTransactions = async () => {
         const txns = await getTransactions(budget._id!)
         setTransactions(txns)
      }
      fetchTransactions()
   }, [budget._id, addedTsx])

   const totalSpent = transactions.reduce((sum, tx) => sum + tx.amount, 0)
   const totalSpentClem = transactions
      .filter((tx) => tx.userName === 'clem')
      .reduce((sum, tx) => sum + tx.amount, 0)
   const totalSpentChlo = transactions
      .filter((tx) => tx.userName === 'chlo')
      .reduce((sum, tx) => sum + tx.amount, 0)
   const remaining = budget.amount - totalSpent

   return (
      <>
         <h2>{budget.date.toString()}</h2>
         <h3>
            Restant: {remaining.toFixed(2)} / {budget.amount.toFixed(2)} €
         </h3>
         {!budget.classified && (
            <ClassifyBudget
               budgetId={budget._id!}
               totalSpentClem={totalSpentClem}
               totalSpentChlo={totalSpentChlo}
               remaining={remaining}
               setBudgets={setBudgets}
            />
         )}
         <table>
            <thead>
               <tr>
                  <th>jour</th>
                  <th>personne</th>
                  <th>libellé</th>
                  <th>montant</th>
               </tr>
            </thead>
            <tbody>
               {transactions.map((tx) => (
                  <tr key={tx._id}>
                     <td>{tx.date.toString()}</td>
                     <td>{tx.userName}</td>
                     <td>{tx.description}</td>
                     <td>{tx.amount.toFixed(2)} €</td>
                  </tr>
               ))}
            </tbody>
         </table>
         <h3>Total dépensé par Clem: {totalSpentClem.toFixed(2)}</h3>
         <h3>Total dépensé par Chlo: {totalSpentChlo.toFixed(2)}</h3>
         <h3>Total dépensé: {totalSpent.toFixed(2)}</h3>
      </>
   )
}
