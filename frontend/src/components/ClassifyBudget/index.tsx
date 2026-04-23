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
            Clôturer
         </button>
         <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
         >
            {!isClassified ? (
               <div>
                  <h1>Clôturer le budget</h1>
                  <p>
                     Assure-toi d'avoir bien fait l'équilibrage avant de
                     clôturer le budget.
                  </p>
                  <p>
                     {giver} doit donner {amountToTransfer.toFixed(2)} € à{' '}
                     {receiver}
                  </p>
                  <button onClick={handleClassify}>C'est bon!</button>
               </div>
            ) : (
               <div>
                  <h1>Budget clôturé !</h1>
                  {remaining < 0 ? (
                     <div>
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
                        <p>restant: {remaining.toFixed(2)} €</p>
                        <button
                           onClick={() => {
                              setIsModalOpen(false)
                              handleUpdateBudgets()
                           }}
                        >
                           Fermer
                        </button>
                     </div>
                  ) : (
                     <div>
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
                        <p>restant: {remaining.toFixed(2)} €</p>
                        <button
                           onClick={() => {
                              setIsModalOpen(false)
                              handleUpdateBudgets()
                           }}
                        >
                           Fermer
                        </button>
                     </div>
                  )}
               </div>
            )}
         </Modal>
      </>
   )
}
