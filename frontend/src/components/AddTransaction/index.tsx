import Modal from 'react-modal'
import { useState } from 'react'
import { addTransaction } from '../../lib/common'

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
            className="bg-charcoal border-2 border-turquoise p-6 shadow-xl w-full mx-4"
            overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
         >
            <h1>nouvelle transaction</h1>
            <form
               onSubmit={(e) => {
                  handleSubmit(e)
                  setIsModalOpen(false)
               }}
               className="mt-6"
            >
               <label htmlFor="name" className="font-bold">
                  qui ?
               </label>
               <br />
               <div className="flex justify-around">
                  <div>
                     <input
                        type="radio"
                        id="clem"
                        name="name"
                        value="clem"
                        className="peer size-4 mr-2"
                     />
                     <label
                        htmlFor="clem"
                        className="peer-checked:text-canary peer-checked:font-bold peer-checked:underline"
                     >
                        clem
                     </label>
                  </div>
                  <div>
                     <input
                        type="radio"
                        id="chlo"
                        name="name"
                        value="chlo"
                        className="peer size-4 mr-2"
                     />
                     <label
                        htmlFor="chlo"
                        className="peer-checked:text-turquoise peer-checked:font-bold peer-checked:underline"
                     >
                        chlo
                     </label>
                  </div>
               </div>
               <br />
               <label htmlFor="description" className="font-bold">
                  quoi ?
               </label>
               <input
                  type="text"
                  id="description"
                  name="description"
                  className="bg-almond text-charcoal w-3/4 ml-4 h-10 text-center font-bold rounded-lg"
               />
               <br />
               <div className="mt-4">
                  <label htmlFor="amount" className="font-bold">
                     combien ?
                  </label>
                  <input
                     id="amount"
                     name="amount"
                     type="text"
                     inputMode="decimal"
                     pattern="[0-9]+([.,][0-9]{1,2})?"
                     className="bg-almond text-charcoal w-20 ml-4 h-10 text-center font-bold rounded-lg"
                  />
               </div>
               <div className="flex justify-around mt-6 h-fit">
                  <button
                     type="submit"
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
            </form>
         </Modal>
      </>
   )
}
