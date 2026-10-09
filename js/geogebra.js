'use strict';
(function(){
  const loadedTopics = new Set();
  let generalLoaded = false;

  function setStatus(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
  }

  function createApplet(targetId, commands, statusId, height) {
    const target = document.getElementById(targetId);
    if (!target) return;
    if (typeof GGBApplet === 'undefined') {
      setStatus(statusId, 'No se pudo cargar GeoGebra. Comprueba la conexión a internet y vuelve a cargar la página.');
      return;
    }
    target.innerHTML = '';
    const params = {
      appName: 'graphing',
      width: Math.max(320, Math.floor(target.getBoundingClientRect().width || 800)),
      height: height,
      showToolBar: true,
      showAlgebraInput: true,
      showMenuBar: false,
      showResetIcon: true,
      enableRightClick: true,
      enableShiftDragZoom: true,
      showZoomButtons: true,
      allowStyleBar: true,
      useBrowserForJS: true,
      language: 'es',
      appletOnLoad: function(api) {
        commands.forEach(function(command) { api.evalCommand(command); });
        setStatus(statusId, 'GeoGebra está listo. Interactúa con la gráfica directamente en esta página.');
      }
    };
    try {
      const applet = new GGBApplet(params, true);
      applet.inject(targetId);
    } catch (error) {
      console.error('No se pudo iniciar GeoGebra:', error);
      setStatus(statusId, 'GeoGebra no pudo iniciarse. Recarga la página o abre la calculadora completa.');
    }
  }

  function initGeneral() {
    if (generalLoaded) return;
    const target = document.getElementById('geogebra-general');
    if (!target) return;
    generalLoaded = true;
    createApplet('geogebra-general', [], 'geogebra-general-status', 600);
  }

  window.loadTopicGeoGebra = function(topicNumber) {
    const target = document.getElementById('geogebra-topic');
    const help = document.getElementById('geogebra-topic-help');
    if (!target || !help) return;
    if (Number(topicNumber) !== 9 && Number(topicNumber) !== 10) {
      target.innerHTML = '';
      target.style.display = 'none';
      help.textContent = 'La actividad preparada en GeoGebra está disponible para los temas 9 y 10. Para explorar otras funciones, abre la calculadora completa del Laboratorio gráfico.';
      return;
    }
    target.style.display = 'block';
    target.classList.add('geogebra-topic');
    const key = String(topicNumber);
    if (loadedTopics.has(key)) return;
    loadedTopics.add(key);
    const commands = Number(topicNumber) === 9
      ? ['f(x)=x^2-4x+3', 'V=(2,-1)', 'A=(1,0)', 'B=(3,0)', 'C=(0,3)']
      : ['p(x)=x^3-6x^2+11x-6', 'A=(1,0)', 'B=(2,0)', 'C=(3,0)'];
    createApplet('geogebra-topic', commands, 'geogebra-topic-help', 500);
  };

  window.addEventListener('load', initGeneral);
  document.addEventListener('DOMContentLoaded', initGeneral);
})();