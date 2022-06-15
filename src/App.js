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

import PageLayout from './components/PageLayout/PageLayout';

function App() {
  return (
    <div className="App">
      <EmployeeProvider>
        <PageLayout>
          <AuthenticatedTemplate>
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path="cases/:id" element={<CaseDetail />} />
                <Route path="cases/new" element={<NewCase />} />
                <Route path="documents/:id" element={<DocumentDetail />} />
                <Route path="management" element={<Management />} />
                <Route path="management/cases/:id" element={<MemberCaseDetail />} />
              </Routes>
            </Router>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <p>Not Signed In</p>
          </UnauthenticatedTemplate>
          
        </PageLayout>
      </EmployeeProvider>
    </div>
  );
}

export default App;
