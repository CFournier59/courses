import { Link } from 'react-router'
import type { Budget } from '../../lib/common'

interface ArchivesProps {
   budgets: Budget[]
}

export default function Archives({ budgets }: ArchivesProps) {
   return (
      <>
         <h1>Archives</h1>
         <ul>
            {budgets.map(
               (budget) =>
                  budget.classified && (
                     <li key={budget._id}>
                        <Link to={`/budget/${budget._id}`}>
                           {new Date(budget.date).toLocaleDateString('fr-FR')}
                        </Link>
                     </li>
                  ),
            )}
         </ul>
      </>
   )
}
