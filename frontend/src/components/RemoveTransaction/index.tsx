import Modal from 'react-modal'
import { useState } from 'react'
import { deleteTransaction, type Transaction } from '../../lib/common'

interface RemoveTransactionProps {
   transaction: Transaction
   onTransactionRemoved: () => void
}

export default function RemoveTransaction({
   transaction,
   onTransactionRemoved,
}: RemoveTransactionProps) {
   const [isModalOpen, setIsModalOpen] = useState(false)

   const handleRemove = async () => {
      deleteTransaction(transaction._id!).then(() => {
         onTransactionRemoved()
      })
   }

   return (
      <>
         <button onClick={() => setIsModalOpen(true)}>Supprimer</button>
         <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
         >
            <h1>Confirmation</h1>
            <h2>Êtes-vous sûr de vouloir supprimer cette transaction ?</h2>
            <p>{new Date(transaction.date).toLocaleDateString('fr-FR')}</p>
            <p>{transaction.userName}</p>
            <p>{transaction.description}</p>
            <p>{transaction.amount.toFixed(2)} €</p>
            <button onClick={handleRemove}>Oui</button>
            <button onClick={() => setIsModalOpen(false)}>Non</button>
         </Modal>
      </>
   )
}
