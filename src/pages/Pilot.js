import React from "react";

const PILOT_URL = "/pilot_lafayette.html";

const Pilot = () => (
  <div className="w-full h-full min-h-screen bg-black flex items-center justify-center">
    <iframe
      title="Pilot Lafayette"
      src={PILOT_URL}
      style={{ width: "100vw", height: "100vh", border: "none" }}
      sandbox="allow-scripts allow-same-origin"
    />
  </div>
);

export default Pilot;
