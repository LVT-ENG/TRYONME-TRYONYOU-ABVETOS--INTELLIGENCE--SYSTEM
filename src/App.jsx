import React, { Suspense, lazy } from 'react';
import { Route, Switch } from "wouter";
import PageLoader from "./components/PageLoader";
import { LanguageProvider } from "./contexts/LanguageContext";

// Lazy imports for performance optimization
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DemoPilot = lazy(() => import("./pages/DemoPilot"));
const AbvetCheckout = lazy(() => import("./components/AbvetCheckout"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/demo" component={DemoPilot} />
        <Route path="/checkout" component={AbvetCheckout} />
        <Route>404: Page Not Found</Route>
      </Switch>
    </Suspense>
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
