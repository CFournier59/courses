import Modal from 'react-modal'
import { useState } from 'react'
import { classifyBudget, getBudgets, type Budget } from '../../lib/common'

interface ClassifyBudgetProps {
   budgetId: string
   totalSpentClem: number
   totalSpentChlo: number
   remaining: number
   setBudgets: (budgets: Budget[]) => void
}

export default function ClassifyBudget({
   budgetId,
   totalSpentClem,
   totalSpentChlo,
   remaining,
   setBudgets,
}: ClassifyBudgetProps) {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isClassified, setIsClassified] = useState(false)

   const handleClassify = async () => {
      classifyBudget(budgetId).then(() => {
         setIsClassified(true)
      })
   }

   const handleUpdateBudgets = async () => {
      const budgets = await getBudgets()
      setBudgets(budgets)
   }

   const giver = totalSpentClem < totalSpentChlo ? 'clem' : 'chlo'
   const receiver = giver === 'clem' ? 'chlo' : 'clem'
   const amountToTransfer = Math.abs(totalSpentClem - totalSpentChlo) / 2
   return (
      <>
         <button
            className="border-4 border-bluue rounded-xl text-canary p-2 text-lg font-bold"
            onClick={() => setIsModalOpen(true)}
         >
            clôturer
         </button>
         <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="bg-charcoal border-2 border-turquoise p-6 shadow-xl w-full mx-4"
            overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
         >
            {!isClassified ? (
               <div>
                  <h1>Clôturer le budget ?</h1>
                  <p>
                     Assure-toi d'avoir bien fait l'équilibrage avant de
                     clôturer le budget.
                  </p>
                  <div className="flex justify-around items-center mt-6">
                     <p
                        className={`text-xl font-bold ${giver === 'clem' ? 'text-canary' : 'text-turquoise'}`}
                     >
                        {giver}
                     </p>
                     <div className="flex items-center gap-2">
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
                        <p className="text-3xl">→</p>
                     </div>
                     <p
                        className={`text-xl font-bold ${receiver === 'clem' ? 'text-canary' : 'text-turquoise'}`}
                     >
                        {receiver}
                     </p>
                  </div>
                  <p className="text-center font-bold">
                     {amountToTransfer.toFixed(2)} €
                  </p>
                  <div className="flex justify-around">
                     <button
                        onClick={handleClassify}
                        className="mx-auto border-4 border-bluue p-2 rounded-xl flex items-center gap-2 mt-6"
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
                        className="mx-auto border-4 border-bluue p-2 rounded-xl flex items-center gap-2 mt-6"
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
               </div>
            ) : (
               <div>
                  <h1>Budget clôturé !</h1>
                  {remaining < 0 ? (
                     <video
                        preload="auto"
                        loop
                        autoPlay
                        id="content"
                        width="896"
                        height="667"
                        className=" rounded-xl"
                     >
                        <source
                           src="https://media.tenor.com/K8ZxOY0X3acAAAPo/throwing-money-throwing-money-away.mp4"
                           type="video/mp4"
                        />
                        <source
                           src="https://media.tenor.com/K8ZxOY0X3acAAAPs/throwing-money-throwing-money-away.webm"
                           type="video/webm"
                        />
                     </video>
                  ) : (
                     <video
                        preload="auto"
                        autoPlay
                        loop
                        id="content"
                        width="896"
                        height="627"
                        className=" rounded-xl"
                     >
                        <source
                           src="https://media.tenor.com/yqyHqTYHnBkAAAPo/thumbs-up-90s.mp4"
                           type="video/mp4"
                        />
                        <source
                           src="https://media.tenor.com/yqyHqTYHnBkAAAPs/thumbs-up-90s.webm"
                           type="video/webm"
                        />
                     </video>
                  )}
                  <h2
                     className={
                        remaining > 0 ? 'text-green-500' : 'text-red-500'
                     }
                  >
                     restant : {remaining.toFixed(2)} €
                  </h2>
                  <button
                     onClick={() => {
                        setIsModalOpen(false)
                        handleUpdateBudgets()
                     }}
                     className="mx-auto border-4 border-bluue p-2 rounded-xl flex items-center gap-2 mt-6"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className={`size-8 ${
                           location.pathname === '/'
                              ? 'text-canary'
                              : 'text-almond'
                        }`}
                     >
                        <path
                           fill="currentColor"
                           d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"
                        />
                     </svg>
                  </button>
               </div>
            )}
         </Modal>
      </>
   )
}
