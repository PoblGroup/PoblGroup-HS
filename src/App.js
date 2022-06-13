import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import Home from './screens/Home'
import PageLayout from './components/PageLayout/PageLayout';
import { EmployeeProvider } from './context/EmployeeContext';

function App() {
  return (
    <div className="App">
      <EmployeeProvider>
        <PageLayout>
          <AuthenticatedTemplate>
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
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
