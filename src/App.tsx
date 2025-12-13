import React from "react";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/demo" component={Demo} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
