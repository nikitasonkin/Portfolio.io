/* ==========================================================================
   Nikita Sonkin Portfolio — Interactive behaviors
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. Last-updated timestamp in footer
     ------------------------------------------------------------------ */
  function setLastUpdated() {
    var el = document.getElementById('last-update');
    if (!el) return;
    var d = new Date(document.lastModified);
    var yyyy = d.getFullYear();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    el.textContent = yyyy + '.' + mm + '.' + dd;
  }

  /* ------------------------------------------------------------------
     2. Active section highlighting in nav
     ------------------------------------------------------------------ */
  function setupActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var links = document.querySelectorAll('.nav-links a');
    if (!sections.length || !links.length) return;

    function setActive() {
      var current = '';
      var scrollY = window.scrollY + 140;

      sections.forEach(function (section) {
        if (scrollY >= section.offsetTop) {
          current = section.id;
        }
      });

      links.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  /* ------------------------------------------------------------------
     3. Copy-to-clipboard buttons with feedback
     ------------------------------------------------------------------ */
  function setupCopyButtons() {
    var buttons = document.querySelectorAll('button.link-tag[data-copy]');
    buttons.forEach(function (btn) {
      var original = btn.textContent;
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy') || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = '[ copied! ]';
            setTimeout(function () {
              btn.textContent = original;
            }, 1500);
          }).catch(function () {
            fallbackCopy(text);
            btn.textContent = '[ copied! ]';
            setTimeout(function () { btn.textContent = original; }, 1500);
          });
        } else {
          fallbackCopy(text);
          btn.textContent = '[ copied! ]';
          setTimeout(function () { btn.textContent = original; }, 1500);
        }
      });
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  function init() {
    setLastUpdated();
    setupActiveNav();
    setupCopyButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
