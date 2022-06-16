import { AuthenticatedTemplate } from "@azure/msal-react";

import './PageLayout.css'
import SignOut from '../SignIn/SignOut';
import { Link } from "react-router-dom";

const PageLayout = (props) => {
  return (
    <>
        <header>
            <a className='logo' href="/">Pobl HS</a>
            <nav>
                <li><Link to='/'>Personal</Link></li>
                <li><Link to='/management'>Management</Link></li>
            </nav>
            <AuthenticatedTemplate>
              <SignOut />
            </AuthenticatedTemplate>
        </header>

        <div className='pageContent'>
            {props.children}
        </div>
    </>
  )
}

export default PageLayout