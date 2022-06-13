import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import './PageLayout.css'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignIn/SignOut';

const PageLayout = (props) => {
  return (
    <>
        <header>
            <a className='logo' href="/">Pobl HS</a>
            <nav>
                <li>Cases</li>
                <li>Documents</li>
                <li>Team</li>
                <li>Tasks</li>
            </nav>
            <AuthenticatedTemplate>
              <SignOut />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <SignIn />
            </UnauthenticatedTemplate>
        </header>

        <div className='pageContent'>
            {props.children}
        </div>
    </>
  )
}

export default PageLayout