(function(){
  // Crea un iframe seguro con el widget
  var origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
  var src = origin + '/adbetos/widget.html';
  function mount(){
    var c = document.getElementById('abvetos-widget-container') || (function(){
      var d=document.createElement('div'); d.id='abvetos-widget-container'; document.body.appendChild(d); return d;
    })();
    var ifr=document.createElement('iframe');
    ifr.src=src; ifr.width='100%'; ifr.height='420'; ifr.style.border='1px solid rgba(255,255,255,.15)'; ifr.loading='lazy';
    c.innerHTML=''; c.appendChild(ifr);
  }
  if(document.readyState==='complete'||document.readyState==='interactive'){ setTimeout(mount,0); } else { document.addEventListener('DOMContentLoaded',mount); }
})();
