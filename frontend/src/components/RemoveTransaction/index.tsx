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
            className="bg-charcoal border-2 border-turquoise p-6 shadow-xl w-full mx-4"
            overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
         >
            <h1>Confirmation</h1>
            <h2>supprimer cette transaction ?</h2>
            <ul className="border-1 border-almond my-6 p-2">
               <li>{new Date(transaction.date).toLocaleDateString('fr-FR')}</li>
               <li>{transaction.userName}</li>
               <li>{transaction.description}</li>
               <li>{transaction.amount.toFixed(2)} €</li>
            </ul>
            <div className="flex justify-around mt-6 h-fit">
               <button
                  onClick={handleRemove}
                  className="mx-auto border-4 border-bluue p-2 rounded-xl "
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
               <button
                  onClick={() => setIsModalOpen(false)}
                  className="mx-auto border-4 border-bluue p-2 rounded-xl"
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
                        d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                     />
                  </svg>
               </button>
            </div>
         </Modal>
      </>
   )
}
