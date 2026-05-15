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
   let remaining = 0
   const lastDayOfMonth = new Date()
   lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1)
   lastDayOfMonth.setDate(0)

   const daysInMonth = lastDayOfMonth.getDate()
   const xAxisData = Array.from({ length: daysInMonth }, (_, i) => i + 1)

   // Données pour la ligne du budget prévisonnel
   // Données pour la ligne du budget prévisonnel (rectiligne décroissante)
   const dataSetA: number[] = []
   if (currentBudget) {
      const dailyDecrease = currentBudget.amount / daysInMonth // Montant à soustraire chaque jour
      // Budget restant
      remaining =
         currentBudget.amount -
         transactions.reduce((sum, tx) => sum + tx.amount, 0)

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

   // Jour actuel
   const today = new Date().getDate()

   // Tronquer dataSetB pour s'arrêter au jour actuel
   const dataSetBLimited = dataSetB.slice(0, today)

   return (
      <>
         <h1 className="p-8">statistiques</h1>

         {loading ? (
            <p className="p-8">ça arrive...</p>
         ) : (
            <div className="pb-30 h-200">
               {/* Exemple d'utilisation avec MUI X Charts */}
               {/* <LineChart series={[{ data: dataSetA }, { data: dataSetB }]} /> */}
               <LineChart
                  series={[
                     {
                        data: dataSetA,
                        label: 'Prévisions',
                        color: '#42d9c8',
                     },
                     {
                        data: dataSetBLimited,
                        label: 'Budget restant',
                        color: '#f0f465',
                     },
                  ]}
                  xAxis={[
                     {
                        data: xAxisData, // [1, 2, 3, ..., 31]
                        scaleType: 'linear',
                        label: 'Jour du mois',
                        valueFormatter: (value) => `${value}`, // Affiche le jour,
                        sx: {
                           '.MuiChartsAxis-label': {
                              fill: '#e6ccbe',
                              fontSize: 25,
                           },
                           '.MuiChartsAxis-tickLabel': {
                              fill: '#e6ccbe',
                              fontSize: 25,
                           },
                           '.MuiChartsAxis-line': { stroke: '#e6ccbe' },
                           '.MuiChartsAxis-tick': { stroke: '#e6ccbe' },
                        },
                     },
                  ]}
                  yAxis={[
                     {
                        label: 'Montant (€)',
                        sx: {
                           '.MuiChartsAxis-label': {
                              fill: '#e6ccbe',
                              fontSize: 25,
                           },
                           '.MuiChartsAxis-tickLabel': {
                              fill: '#e6ccbe',
                              fontSize: 25,
                           },
                           '.MuiChartsAxis-line': { stroke: '#e6ccbe' },
                           '.MuiChartsAxis-tick': { stroke: '#e6ccbe' },
                        },
                     },
                  ]}
                  grid={{ horizontal: true, vertical: false }}
                  sx={{
                     '.MuiChartsGrid-line': {
                        stroke: '#935939',
                        strokeDasharray: '4 4',
                     },
                  }}
                  slotProps={{
                     legend: {
                        sx: {
                           color: '#e6ccbe',
                        },
                     },
                  }}
                  height={400}
                  margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
               />
               <h2 className="text-almond">
                  Aujourd'hui, le {today} du mois :
               </h2>
               <h3 className={remaining > 0 ? 'text-canary' : 'text-red-500'}>
                  Restant: {remaining.toFixed(2)} €
               </h3>
               <h3 className="text-turquoise">
                  Prévisionnel: {dataSetA[today - 1]} €
               </h3>
               <h3 className={remaining > 0 ? 'text-almond' : 'text-red-500'}>
                  Écart: {(remaining - dataSetA[today - 1]).toFixed(2)} €
               </h3>
            </div>
         )}
      </>
   )
}
