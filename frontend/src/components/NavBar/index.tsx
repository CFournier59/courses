import { Link, useLocation } from 'react-router'

export default function NavBar() {
   const location = useLocation()
   if (location.pathname === '/login') {
      return null
   }
   return (
      <nav className="fixed bottom-0 left-0 w-full bg-charcoal ">
         <ul className="flex justify-around py-6 border-t-2 border-bluue">
            <li>
               <Link to="/">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     className={`size-10 ${
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
               </Link>
            </li>
            <li>
               <Link to="/archives">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     className={`size-10 ${
                        location.pathname === '/archives'
                           ? 'text-canary'
                           : 'text-almond'
                     }`}
                  >
                     <path
                        fill="currentColor"
                        d="M22 0h-17c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h17v-20h-4v8l-2-2-2 2v-8h-8.505c-1.375 0-1.375-2 0-2h16.505v-2z"
                     />
                  </svg>
               </Link>
            </li>
         </ul>
      </nav>
   )
}
