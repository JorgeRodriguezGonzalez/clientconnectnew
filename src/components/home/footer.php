<script>
(function() {
const paramsToKeep = ['gclid','gbraid','wbraid','gad_source','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];

// Guardar parámetros de URL en cookies (30 días)
const urlParams = new URLSearchParams(window.location.search);
paramsToKeep.forEach(p => {
  const v = urlParams.get(p);
  if (v) {
    document.cookie = p + "=" + encodeURIComponent(v) + "; path=/; max-age=2592000";
  }
});

// Función para leer cookie
function getCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

// Actualiza enlaces internos con parámetros
function updateLinks() {
  document.querySelectorAll('a[href]').forEach(link => {
    try {
      const url = new URL(link.href, window.location.origin);
      if (url.origin === window.location.origin) {
        paramsToKeep.forEach(param => {
          const value = getCookie(param);
          if (value && !url.searchParams.has(param)) {
            url.searchParams.set(param, value);
          }
        });
        link.href = url.toString();
      }
    } catch(e){}
  });
}

// Añadir campos ocultos a formularios
function updateForms() {
  document.querySelectorAll('form').forEach(form => {
    // Evitar agregar campos a formularios de búsqueda o login
    if (form.classList.contains('search-form') || form.action.includes('wp-login')) {
      return;
    }
    
    paramsToKeep.forEach(param => {
      const value = getCookie(param);
      if (value && !form.querySelector(`[name="${param}"]`)) {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = param;
        hidden.value = value;
        form.appendChild(hidden);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateLinks();
  updateForms();
});

// Reaplicar si Elementor/AJAX cambia el DOM
const observer = new MutationObserver(() => {
  updateLinks();
  updateForms();
});
observer.observe(document.body, { childList: true, subtree: true });
})();
</script>