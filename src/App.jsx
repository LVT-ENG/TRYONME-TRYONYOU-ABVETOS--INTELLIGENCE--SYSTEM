import React from 'react';
import { Route, Switch } from "wouter";
import LandingPage from "./pages/LandingPage";
import DemoPilot from "./pages/DemoPilot";
import AbvetCheckout from "./components/AbvetCheckout";

// Mock Contexts to satisfy component dependencies if any
export const LanguageContext = React.createContext({ t: (key) => key, language: 'en' });
export const useLanguage = () => React.useContext(LanguageContext);

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/demo" component={DemoPilot} />
      <Route path="/checkout" component={AbvetCheckout} />
      <Route>404: Page Not Found</Route>
    </Switch>
  );
}

function App() {
  return (
    <LanguageContext.Provider value={{ t: (k) => k, language: 'en' }}>
      <Router />
    </LanguageContext.Provider>
  );
}

export default App;
