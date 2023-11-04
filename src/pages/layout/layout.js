import { Outlet, Link } from 'react-router-dom';
import './layout.css';

const Layout = () => {

return(
<>

      <nav className="navbar">
        <ul className="navlinkContainer">
          <li>
            <Link to="/"><p>Home</p></Link>
          </li>
          <li>
            <Link to="/charactersearch">Character Search</Link>
          </li>
          <li>
            <Link to="/affixes">Affixes</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
		</>

)

};

export default Layout;
