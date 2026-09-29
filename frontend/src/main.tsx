import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './styles.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <HashRouter>
         <App />
      </HashRouter>
   </StrictMode>,
)

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('service-worker.js')
         .then(() => console.log('Service Worker enregistré'))
         .catch((err) => console.error('Erreur SW :', err))
   })
   navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'BACKEND_DOWN') {
         alert("L'API n'a pas répondu, veuillez vérifier votre connexion")
         // ou afficher un bandeau, un toast, etc. (pour la prochaine update)
      }
   })
}
