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
         <button
            className="p-1 border-3 border-bluue rounded-xl"
            onClick={() => setIsModalOpen(true)}
         >
            <svg
               width="24"
               height="24"
               xmlns="http://www.w3.org/2000/svg"
               fillRule="evenodd"
               clipRule="evenodd"
               className="size-6 text-canary"
            >
               <path
                  fill="currentColor"
                  d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"
               />
            </svg>
         </button>
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
