import { useEffect, useState } from 'react'
import type { Budget, Transaction } from '../../lib/common'
import { getTransactions } from '../../lib/common'

import ClassifyBudget from '../ClassifyBudget'
import RemoveTransaction from '../RemoveTransaction'

interface BudgetTableProps {
   budget: Budget
   addedTsx?: number
   setBudgets?: (budgets: Budget[]) => void
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
         <div className="flex justify-around p-6">
            <h1 className="">
               {new Date(budget.date).toLocaleDateString('fr-FR', {
                  month: 'long',
                  year: 'numeric',
               })}
            </h1>
            {!budget.classified && (
               <ClassifyBudget
                  budgetId={budget._id!}
                  totalSpentClem={totalSpentClem}
                  totalSpentChlo={totalSpentChlo}
                  remaining={remaining}
                  setBudgets={setBudgets}
               />
            )}
         </div>
         <h2 className={remaining > 0 ? 'text-almond' : 'text-red-500'}>
            Restant: {remaining.toFixed(2)} / {budget.amount.toFixed(2)} €
         </h2>

         <table className=" mx-2 mt-4 w-full border-collapse">
            <thead>
               <tr>
                  <th>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="size-5 text-almond"
                     >
                        <path
                           fill="currentColor"
                           d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"
                        />
                     </svg>
                  </th>
                  <th>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="size-5 text-almond"
                     >
                        <path
                           fill="currentColor"
                           d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
                        />
                     </svg>
                  </th>
                  <th>
                     <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-almond size-7"
                     >
                        <path
                           d="m11.239 15.533c-1.045 3.004-1.238 3.451-1.238 3.84 0 .441.385.627.627.627.272 0 1.108-.301 3.829-1.249zm.888-.888 3.22 3.22 6.408-6.401c.163-.163.245-.376.245-.591 0-.213-.082-.427-.245-.591-.58-.579-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245zm-3.127-.895c0-.402-.356-.75-.75-.75-2.561 0-2.939 0-5.5 0-.394 0-.75.348-.75.75s.356.75.75.75h5.5c.394 0 .75-.348.75-.75zm5-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75z"
                           fill="currentColor"
                        />
                     </svg>
                  </th>
                  <th>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="size-5 text-almond"
                     >
                        <path
                           fill="currentColor"
                           d="M17 12c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm.5 8.474v.526h-.5v-.499c-.518-.009-1.053-.132-1.5-.363l.228-.822c.478.186 1.114.383 1.612.27.574-.13.692-.721.057-1.005-.465-.217-1.889-.402-1.889-1.622 0-.681.52-1.292 1.492-1.425v-.534h.5v.509c.362.01.768.073 1.221.21l-.181.824c-.384-.135-.808-.257-1.222-.232-.744.043-.81.688-.29.958.856.402 1.972.7 1.972 1.773.001.858-.672 1.315-1.5 1.432zm1.624-10.179c1.132-.223 2.162-.626 2.876-1.197v.652c0 .499-.386.955-1.007 1.328-.581-.337-1.208-.6-1.869-.783zm-2.124-5.795c2.673 0 5-1.007 5-2.25s-2.327-2.25-5-2.25c-2.672 0-5 1.007-5 2.25s2.328 2.25 5 2.25zm.093-2.009c-.299-.09-1.214-.166-1.214-.675 0-.284.334-.537.958-.593v-.223h.321v.211c.234.005.494.03.784.09l-.116.342c-.221-.051-.467-.099-.708-.099l-.072.001c-.482.02-.521.287-.188.399.547.169 1.267.292 1.267.74 0 .357-.434.548-.967.596v.22h-.321v-.208c-.328-.003-.676-.056-.962-.152l.147-.343c.244.063.552.126.828.126l.208-.014c.369-.053.443-.3.035-.418zm-11.093 13.009c1.445 0 2.775-.301 3.705-.768.311-.69.714-1.329 1.198-1.899-.451-1.043-2.539-1.833-4.903-1.833-2.672 0-5 1.007-5 2.25s2.328 2.25 5 2.25zm.093-2.009c-.299-.09-1.214-.166-1.214-.675 0-.284.335-.537.958-.593v-.223h.321v.211c.234.005.494.03.784.09l-.117.342c-.22-.051-.466-.099-.707-.099l-.072.001c-.482.02-.52.287-.188.399.547.169 1.267.292 1.267.74 0 .357-.434.548-.967.596v.22h-.321v-.208c-.329-.003-.676-.056-.962-.152l.147-.343c.244.063.552.126.828.126l.208-.014c.368-.053.443-.3.035-.418zm4.003 8.531c-.919.59-2.44.978-4.096.978-2.672 0-5-1.007-5-2.25v-.652c1.146.918 3.109 1.402 5 1.402 1.236 0 2.499-.211 3.549-.611.153.394.336.773.547 1.133zm-9.096-3.772v-.651c1.146.917 3.109 1.401 5 1.401 1.039 0 2.094-.151 3.028-.435.033.469.107.926.218 1.37-.888.347-2.024.565-3.246.565-2.672 0-5-1.007-5-2.25zm0-2.5v-.652c1.146.918 3.109 1.402 5 1.402 1.127 0 2.275-.176 3.266-.509-.128.493-.21 1.002-.241 1.526-.854.298-1.903.483-3.025.483-2.672 0-5-1.007-5-2.25zm11-11v-.652c1.146.918 3.109 1.402 5 1.402 1.892 0 3.854-.484 5-1.402v.652c0 1.243-2.327 2.25-5 2.25-2.672 0-5-1.007-5-2.25zm0 5v-.652c.713.571 1.744.974 2.876 1.197-.661.183-1.287.446-1.868.783-.622-.373-1.008-.829-1.008-1.328zm0-2.5v-.651c1.146.917 3.109 1.401 5 1.401 1.892 0 3.854-.484 5-1.401v.651c0 1.243-2.327 2.25-5 2.25-2.672 0-5-1.007-5-2.25z"
                        />
                     </svg>
                  </th>
               </tr>
            </thead>
            <tbody>
               {transactions.map((tx) => (
                  <tr key={tx._id} className="h-12">
                     <td>
                        {new Date(tx.date).toLocaleDateString('fr-FR', {
                           day: 'numeric',
                        })}
                     </td>
                     <td
                        className={
                           tx.userName === 'clem'
                              ? 'text-canary'
                              : 'text-turquoise'
                        }
                     >
                        {tx.userName}
                     </td>
                     <td className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
                        {tx.description}
                     </td>
                     <td>{tx.amount.toFixed(2)} €</td>
                     {!budget.classified && (
                        <td>
                           <RemoveTransaction
                              transaction={tx}
                              onTransactionRemoved={() => {
                                 // Refresh the transactions list
                                 const fetchTransactions = async () => {
                                    const txns = await getTransactions(
                                       budget._id!,
                                    )
                                    setTransactions(txns)
                                 }
                                 fetchTransactions()
                              }}
                           />
                        </td>
                     )}
                  </tr>
               ))}
            </tbody>
         </table>
         <h3 className="text-canary">
            Total <span className="text-almond">dépensé par</span> Clem :{' '}
            {totalSpentClem.toFixed(2)} €
         </h3>
         <h3 className="text-turquoise">
            Total <span className="text-almond">dépensé par</span> Chlo :{' '}
            {totalSpentChlo.toFixed(2)} €
         </h3>
         <h3 className="mb-4">Total dépensé: {totalSpent.toFixed(2)} €</h3>
      </>
   )
}
