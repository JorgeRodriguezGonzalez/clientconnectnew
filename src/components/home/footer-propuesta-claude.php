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

  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

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

  function updateForms() {
    document.querySelectorAll('form').forEach(form => {
      // IMPORTANTE: Marcar formulario para evitar procesarlo múltiples veces
      if (form.dataset.paramsAdded) return;
      
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
      
      // Marcar como procesado
      form.dataset.paramsAdded = 'true';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateLinks();
    updateForms();
  });

  // Debounce para el observer
  let timeout;
  const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      updateLinks();
      updateForms();
    }, 200);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>