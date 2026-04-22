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
         <button onClick={() => setIsModalOpen(true)}>
            Ajouter une transaction
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
