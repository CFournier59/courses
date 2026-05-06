import type { Budget } from '../../lib/common'
import { useParams } from 'react-router'

import BudgetTable from '../../components/BudgetTable'

interface BudgetProps {
   budgets: Budget[]
   setLoading: (loading: boolean) => void
}

export default function ThisBudget({ budgets, setLoading }: BudgetProps) {
   const { id } = useParams()
   const setBudgets = () => {} // Placeholder pour éviter les erreurs de type, à remplacer par une fonction réelle si nécessaire
   const budget = budgets.find((b) => b._id === id)

   if (!budget) {
      return <div>Budget not found</div>
   }

   return (
      <div className="pb-30">
         <BudgetTable
            budget={budget}
            setBudgets={setBudgets}
            setLoading={setLoading}
         />
      </div>
   )
}
