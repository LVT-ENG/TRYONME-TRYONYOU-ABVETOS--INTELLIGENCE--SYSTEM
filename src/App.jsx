import React, { useMemo } from 'react';
import { Route, Switch } from "wouter";
import LandingPage from "./pages/LandingPage";
import PilotExperience from "./components/PilotExperience";
import AbvetCheckout from "./components/AbvetCheckout";
import { LanguageContext } from './contexts/LanguageContext';

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/demo" component={PilotExperience} />
      <Route path="/checkout" component={AbvetCheckout} />
      <Route>404: Page Not Found</Route>
    </Switch>
  );
}

function App() {
  const contextValue = useMemo(() => ({ t: (k) => k, language: 'en' }), []);

  return (
    <LanguageContext.Provider value={contextValue}>
      <Router />
    </LanguageContext.Provider>
  );
}

export default App;
