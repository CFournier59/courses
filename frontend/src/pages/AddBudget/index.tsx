import { useNavigate } from 'react-router'
import { addBudget, getBudgets, type Budget } from '../../lib/common'

interface AddBudgetProps {
   setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>
}

export default function AddBudget({ setBudgets }: AddBudgetProps) {
   const navigate = useNavigate()
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const amount = formData.get('amount')
      // ajout du budget via l'API
      addBudget(Number(amount)).then(async () => {
         //mise à jour de la liste des budgets
         const budgetsData = await getBudgets()
         setBudgets(budgetsData)
      })
      // redirection vers la page d'accueil
      navigate('/')
   }

   return (
      <div>
         <h1>Ajouter un budget</h1>
         <form onSubmit={handleSubmit}>
            <label htmlFor="amount">Montant :</label>
            <input type="number" id="amount" name="amount" />
            <button type="submit">Ajouter</button>
         </form>
      </div>
   )
}
