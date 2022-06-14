import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import { EmployeeProvider } from './context/EmployeeContext';
import Home from './screens/Home'
import CaseDetail from './screens/CaseDetail';
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
