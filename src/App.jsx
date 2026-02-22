import React from 'react';
import { Route, Switch } from "wouter";
import LandingPage from "./pages/LandingPage";
import PilotExperience from "./components/PilotExperience";
import AbvetCheckout from "./components/AbvetCheckout";
import { LanguageProvider } from "./i18n/LanguageContext";

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
  return (
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  );
}

export default App;
