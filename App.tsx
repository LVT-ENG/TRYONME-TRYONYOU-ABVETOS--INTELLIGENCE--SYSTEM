import { Suspense, lazy } from "react";
import { Toaster } from "./ui-sonner";
import { TooltipProvider } from "./tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeProvider } from "./ThemeContext";
import Home from "./Home";
import { Spinner } from "./spinner";

// Bolt Optimization: Lazy load heavy routes to improve initial load time
const NotFound = lazy(() => import("./NotFound"));
const BiometricCapture = lazy(() => import("./BiometricCapture"));
const Checkout = lazy(() => import("./Checkout"));
const Wardrobe = lazy(() => import("./Wardrobe"));
const PauAgent = lazy(() => import("./PauAgent"));
// New routes from Google News update (MVP)
const Pilot = lazy(() => import("./Pilot"));
const Result = lazy(() => import("./Result"));

function Router() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-black">
          <Spinner className="w-8 h-8 text-white" />
        </div>
      }
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tryon" component={BiometricCapture} />
        <Route path="/wardrobe" component={Wardrobe} />
        <Route path="/pau" component={PauAgent} />
        <Route path="/checkout" component={Checkout} />

        {/* MVP Routes */}
        <Route path="/pilot" component={Pilot} />
        <Route path="/result" component={Result} />

        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
