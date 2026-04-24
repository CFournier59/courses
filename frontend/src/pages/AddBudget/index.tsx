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
      const normalize = (formData.get('amount')?.toString() || '').replace(
         ',',
         '.',
      )
      const amount = parseFloat(normalize)
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
      <>
         <h1 className="p-8">Ajouter un budget</h1>
         <form onSubmit={handleSubmit}>
            <fieldset className="w-fit mx-auto my-20">
               <label htmlFor="amount" className="font-bold">
                  Montant :
               </label>
               <input
                  id="amount"
                  name="amount"
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]+([.,][0-9]{1,2})?"
                  className="bg-almond text-charcoal w-20 ml-4 h-10 text-center font-bold rounded-lg"
               />
            </fieldset>
            <br />
            <button
               type="submit"
               className="mx-auto border-4 border-bluue p-2 rounded-xl flex items-center gap-2"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-canary size-8"
               >
                  <path
                     fill="currentColor"
                     d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                  />
               </svg>
            </button>
         </form>
      </>
   )
}
