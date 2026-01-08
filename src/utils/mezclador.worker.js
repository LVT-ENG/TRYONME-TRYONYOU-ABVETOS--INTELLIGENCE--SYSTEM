self.onmessage = function(e) {
  const { proyectos } = e.data;
  console.log("Worker: Mezclando proyectos hijas...");
  const resultado = proyectos.map(hija => ({
    ...hija,
    status: 'Sincronizado',
    timestamp: new Date().toISOString()
  }));
  self.postMessage(resultado);
};
