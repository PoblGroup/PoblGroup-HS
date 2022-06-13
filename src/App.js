import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import Home from './screens/Home'
import PageLayout from './components/PageLayout/PageLayout';

function App() {
  return (
    <div className="App">
      <PageLayout>
        <AuthenticatedTemplate>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </Router>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>Nope</p>
        </UnauthenticatedTemplate>
        
      </PageLayout>
    </div>
  );
}

export default App;
