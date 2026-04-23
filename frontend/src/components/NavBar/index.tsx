import { Link } from 'react-router'

export default function NavBar() {
   return (
      <nav className="navbar">
         <ul>
            <li>
               <Link to="/">Home</Link>
            </li>
            <li>
               <Link to="/archives">Archives</Link>
            </li>
         </ul>
      </nav>
   )
}
