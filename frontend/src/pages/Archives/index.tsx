import { Link } from 'react-router'
import type { Budget } from '../../lib/common'

interface ArchivesProps {
   budgets: Budget[]
   loading: boolean
}

export default function Archives({ budgets, loading }: ArchivesProps) {
   if (loading) {
      return <p className="p-8">ça arrive...</p>
   }

   return (
      <div className="pb-30 mx-2 max-w-full">
         <h1 className="p-8">Archives</h1>
         <ul className="mx-2">
            {budgets
               // tri par chronologique décroissant des budgets classifiés
               .sort((a, b) => {
                  if (!a || !b) return 0
                  const dateA = new Date(a.date as Date)
                  const dateB = new Date(b.date as Date)
                  return dateB.getTime() - dateA.getTime()
               })
               // affichage des budgets classifiés uniquement
               .map(
                  (budget) =>
                     budget.classified && (
                        <li
                           key={budget._id}
                           className="border-1 border-bluue rounded-xl mt-4 text-canary p-2"
                        >
                           <Link to={`/budget/${budget._id}`} className="block">
                              {new Date(budget.date).toLocaleDateString(
                                 'fr-FR',
                                 {
                                    month: 'long',
                                    year: 'numeric',
                                 },
                              )}
                           </Link>
                        </li>
                     ),
               )}
         </ul>
      </div>
   )
}
