import type { Budget } from '../../lib/common'

interface BudgetTableProps {
   budget: Budget
}

export default function BudgetTable({ budget }: BudgetTableProps) {
   return (
      <>
         <h2>{budget.date.toString()}</h2>
         <h3>Restant: 600 / {budget.amount.toFixed(2)}</h3>
         <table>
            <thead>
               <tr>
                  <th>jour</th>
                  <th>personne</th>
                  <th>libellé</th>
                  <th>montant</th>
               </tr>
            </thead>
            <tbody>{/* Affichage des budgets */}</tbody>
         </table>
      </>
   )
}
