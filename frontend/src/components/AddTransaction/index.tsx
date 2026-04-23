import Modal from 'react-modal'
import { useState } from 'react'
import { addTransaction, type Transaction } from '../../lib/common'

interface AddTransactionProps {
   budgetId: string
   onTransactionAdded: () => void
}

export default function AddTransaction({
   budgetId,
   onTransactionAdded,
}: AddTransactionProps) {
   const [isModalOpen, setIsModalOpen] = useState(false)

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      // gestion de l'input amount
      const normalize = (formData.get('amount')?.toString() || '').replace(
         ',',
         '.',
      )
      const amount = parseFloat(normalize)
      // construction de l'objet transaction à envoyer à l'API
      const data = {
         userName: formData.get('name') as string,
         description: formData.get('description') as string,
         amount: amount,
         budgetId: budgetId,
      }
      // ajout du budget via l'API
      addTransaction(data).then(async () => {
         onTransactionAdded()
      })
   }

   return (
      <>
         <button
            className="mx-auto border-4 border-bluue p-2 rounded-xl flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
         >
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
            <p className="text-lg font-bold text-canary">transaction</p>
         </button>
         <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
         >
            <h1>Ajouter une transaction</h1>
            <form
               onSubmit={(e) => {
                  handleSubmit(e)
                  setIsModalOpen(false)
               }}
            >
               <label htmlFor="name">qui?</label>
               <br />
               <input type="radio" id="clem" name="name" value="clem" />
               <label htmlFor="clem">clem</label>
               <input type="radio" id="chlo" name="name" value="chlo" />
               <label htmlFor="chlo">chlo</label>
               <br />
               <label htmlFor="description">quoi?</label>
               <input type="text" id="description" name="description" />
               <br />
               <label htmlFor="amount">combien?</label>
               <input
                  id="amount"
                  name="amount"
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]+([.,][0-9]{1,2})?"
               />
               <button type="submit">Ajouter</button>
            </form>
         </Modal>
      </>
   )
}
