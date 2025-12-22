import React from "react";
import { createRoot } from "react-dom/client";
import { ProcessingView } from "./components/ProcessingView.jsx";
import AppComponent from "./App";
import "./style.css";

const App = () => {
  const [done, setDone] = React.useState(false);

  return (
    <>
      {!done ? (
        <ProcessingView onComplete={() => setDone(true)} />
      ) : (
        <AppComponent />
      )}
    </>
  );
};

createRoot(document.getElementById("root")).render(<App />);