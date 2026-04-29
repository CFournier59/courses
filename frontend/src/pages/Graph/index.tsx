import {
   type Budget,
   type Transaction,
   getTransactions,
} from '../../lib/common'
import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

interface GraphProps {
   budgets: Budget[]
   loading: boolean
}

export default function Graph({ budgets, loading }: GraphProps) {
   // État pour les transactions, déclaré au niveau racine
   const [transactions, setTransactions] = useState<Transaction[]>([])

   useEffect(() => {
      // Trouve le budget non classé
      const currentBudget = budgets.find(
         (budget) => budget.classified === false,
      )

      if (!currentBudget?._id) {
         return // Sort si pas de budget valide
      }

      // Fonction pour récupérer les transactions
      const fetchTransactions = async () => {
         try {
            const txns = await getTransactions(currentBudget._id)
            setTransactions(txns)
         } catch (error) {
            console.error(
               'Erreur lors de la récupération des transactions :',
               error,
            )
         }
      }

      fetchTransactions()

      // Nettoyage si le composant est démonté
      return () => {
         // Ici, tu peux annuler la requête si nécessaire
      }
   }, [budgets]) // Dépendance : budgets

   // Trouve le budget non classé
   const currentBudget = budgets.find((budget) => budget.classified === false)

   // Préparation des données pour le graphique
   const lastDayOfMonth = new Date()
   lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1)
   lastDayOfMonth.setDate(0)

   const daysInMonth = lastDayOfMonth.getDate()
   const xAxisData = Array.from({ length: daysInMonth }, (_, i) => i + 1)

   // Données pour la ligne du budget initial
   // Données pour la ligne du budget initial (rectiligne décroissante)
   const dataSetA: number[] = []
   if (currentBudget) {
      const dailyDecrease = currentBudget.amount / daysInMonth // Montant à soustraire chaque jour

      for (let i = 1; i <= daysInMonth; i++) {
         const y = currentBudget.amount - dailyDecrease * (i - 1) // Décroît à chaque itération
         dataSetA.push(Math.round(y * 100) / 100) // Arrondi à 2 décimales pour éviter les floats imprécis
      }
   }

   // Données pour la ligne du budget restant selon les transactions
   const transactionsSorted = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
   )

   const dataSetB = xAxisData.map((day) =>
      transactionsSorted.reduce((remaining, txn) => {
         const txnDay = new Date(txn.date).getDate()
         return txnDay <= day ? remaining - txn.amount : remaining
      }, currentBudget?.amount || 0),
   )

   // Affichage du chargement
   if (loading) {
      return <p className="p-8">ça arrive...</p>
   }

   console.log(dataSetA, dataSetB)

   return (
      <div className="pb-30 h-200">
         {/* Exemple d'utilisation avec MUI X Charts */}
         {/* <LineChart series={[{ data: dataSetA }, { data: dataSetB }]} /> */}
         <LineChart
            series={[
               {
                  data: dataSetA,
                  label: 'Budget initial',
                  color: 'blue',
               },
               {
                  data: dataSetB,
                  label: 'Budget restant',
                  color: 'red',
               },
            ]}
            xAxis={[
               {
                  data: Array.from(
                     { length: lastDayOfMonth.getDate() },
                     (_, i) => i + 1,
                  ), // [1, 2, 3, ..., 31]
                  scaleType: 'linear',
                  label: 'Jour du mois',
                  valueFormatter: (value) => `${value}`, // Affiche le jour
               },
            ]}
            yAxis={[
               {
                  label: 'Montant (€)',
               },
            ]}
            height={400}
            margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
         />
         <p>Graphique à afficher ici</p>
      </div>
   )
}
