<?php
/**
 * The template for displaying the footer.
 *
 * Contains the body & html closing tags.
 *
 * @package HelloElementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'footer' ) ) {
	if ( hello_elementor_display_header_footer() ) {
		if ( did_action( 'elementor/loaded' ) && hello_header_footer_experiment_active() ) {
			get_template_part( 'template-parts/dynamic-footer' );
		} else {
			get_template_part( 'template-parts/footer' );
		}
	}
}
?>

<?php wp_footer(); ?>

<script>
(function() {
  const paramsToKeep = ['gclid','gbraid','wbraid','gad_source','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  const cookieMaxAge = 60 * 60 * 24 * 5; // 5 días en segundos

  // Función para guardar cookie
  function setCookie(name, value, maxAge) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; max-age=" + maxAge;
  }

  // Guardar parámetros de URL en sessionStorage y cookies
  const urlParams = new URLSearchParams(window.location.search);
  let foundParams = {};
  paramsToKeep.forEach(p => {
    const value = urlParams.get(p);
    if (value) {
      foundParams[p] = value;
      setCookie(p, value, cookieMaxAge); // cookie de 5 días
    }
  });

  if (Object.keys(foundParams).length > 0) {
    sessionStorage.setItem('persistedParams', JSON.stringify(foundParams));
  }

  // Leer cookie
  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  // Recupera parámetros: primero sessionStorage, si no, cookie
  function getSavedParams() {
    let params = JSON.parse(sessionStorage.getItem('persistedParams') || '{}');
    if (!Object.keys(params).length) {
      paramsToKeep.forEach(p => {
        const v = getCookie(p);
        if (v) params[p] = v;
      });
    }
    return params;
  }

  const savedParams = getSavedParams();

  // Actualizar enlaces internos
  function updateLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      try {
        const url = new URL(link.href, window.location.origin);
        if (url.origin === window.location.origin) {
          paramsToKeep.forEach(param => {
            const value = savedParams[param];
            if (value && !url.searchParams.has(param)) {
              url.searchParams.set(param, value);
            }
          });
          link.href = url.toString();
        }
      } catch(e){}
    });
  }

  // Añadir campos ocultos en formularios
  function updateForms() {
    document.querySelectorAll('form').forEach(form => {
      paramsToKeep.forEach(param => {
        const value = savedParams[param];
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

  // Reaplicar en caso de AJAX / Elementor dinámico
  const observer = new MutationObserver(() => {
    updateLinks();
    updateForms();
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();
</script>

</body>
</html>
