import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import { EmployeeProvider } from './context/EmployeeContext';
import Home from './screens/Home'
import CaseDetail from './screens/CaseDetail';
import NewCase from './screens/NewCase';
import DocumentDetail from './screens/DocumentDetail';
import Management from './screens/Management';
import MemberCaseDetail from './screens/MemberCaseDetail';
import TaskDetail from './screens/TaskDetail';

import PageLayout from './components/PageLayout/PageLayout';
import {ReactComponent as LoggedOutSvg} from "./logged_out.svg"
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <div className="App">
      <EmployeeProvider>
            <Router>
              <PageLayout>
                <AuthenticatedTemplate>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="cases/:id" element={<CaseDetail />} />
                    <Route path="cases/new" element={<NewCase />} />
                    <Route path="documents/:id" element={<DocumentDetail />} />
                    <Route path="management" element={<Management />} />
                    <Route path="management/cases/:id" element={<MemberCaseDetail />} />
                    <Route path="management/tasks/:id" element={<TaskDetail />} />
                  </Routes>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <div className='logged_out_container'>
                    <LoggedOutSvg />
                    <h1>It looks like your not logged in!</h1>
                    <h3>Sign in below to get started.</h3>
                    <SignIn />
                  </div>
                </UnauthenticatedTemplate>
              </PageLayout>
            </Router>
      </EmployeeProvider>
    </div>
  );
}

export default App;
