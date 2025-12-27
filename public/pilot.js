const app = document.getElementById("app");

function screenStart() {
  app.innerHTML = `
    <h1 class="text-3xl font-bold mb-6">Real Measure.<br/>Real Fit.</h1>

    <button
      onclick="screenScan()"
      class="px-8 py-4 bg-black text-white rounded-xl text-lg font-medium"
    >
      Start Pilot
    </button>
  `;
}

function screenScan() {
  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">Scanning body & style…</h2>

    <div class="w-full bg-slate-200 rounded-full h-3 mb-6">
      <div id="bar" class="bg-black h-3 rounded-full w-0 transition-all"></div>
    </div>

    <p class="text-slate-600">Analysing posture, measures & preferences</p>
  `;

  let progress = 0;
  const bar = document.getElementById("bar");

  const interval = setInterval(() => {
    progress += 10;
    bar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(screenResult, 500);
    }
  }, 200);
}

function screenResult() {
  app.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Your Fit is Ready</h2>

    <div class="p-4 border rounded-xl mb-6 bg-white">
      <p><strong>Body Type:</strong> Athletic</p>
      <p><strong>Recommended Size:</strong> M</p>
      <p><strong>Best Fit:</strong> Slim / Structured</p>
    </div>

    <button
      onclick="screenStart()"
      class="text-sm underline text-slate-500"
    >
      Restart Pilot
    </button>
  `;
}

screenStart();
