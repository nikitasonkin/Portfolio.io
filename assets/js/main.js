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
     4. Scroll-reveal with IntersectionObserver
     ------------------------------------------------------------------ */
  function setupScrollReveal() {
    var els = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------
     5. Hamburger menu toggle (mobile)
     ------------------------------------------------------------------ */
  function setupHamburger() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  /* ------------------------------------------------------------------
     6. Boot sequence
     ------------------------------------------------------------------ */
  function runBootSequence(callback) {
    var overlay = document.getElementById('boot-overlay');
    if (!overlay) { callback(); return; }

    // Skip boot if already seen this session
    if (sessionStorage.getItem('booted')) {
      overlay.remove();
      callback();
      return;
    }

    var lines = overlay.querySelectorAll('.boot-line');
    var delay = 0;

    lines.forEach(function (line, i) {
      delay += 250 + Math.random() * 200;
      setTimeout(function () {
        line.classList.add('show');
      }, delay);
    });

    setTimeout(function () {
      overlay.classList.add('fade-out');
      sessionStorage.setItem('booted', '1');
      setTimeout(function () {
        overlay.remove();
        callback();
      }, 400);
    }, delay + 600);
  }

  /* ------------------------------------------------------------------
     7. Back to top button
     ------------------------------------------------------------------ */
  function setupBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     8. Animated counters
     ------------------------------------------------------------------ */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10);
    var suffix = el.getAttribute('data-count-suffix') || '';
    var duration = 1200;
    var start = performance.now();

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = String(current) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function setupCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-count-suffix') || '');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.getAttribute('data-counted')) return;
        el.setAttribute('data-counted', '1');
        observer.unobserve(el);
        animateCounter(el);
      });
    }, { threshold: 0, rootMargin: '0px' });

    // Small delay to let boot overlay clear, then observe
    setTimeout(function () {
      counters.forEach(function (el) { observer.observe(el); });
    }, 100);
  }

  /* ------------------------------------------------------------------
     9. Status bar (section name + scroll % + session clock)
     ------------------------------------------------------------------ */
  function setupStatusBar() {
    var sectionEl = document.getElementById('status-section');
    var scrollEl = document.getElementById('status-scroll');
    var clockEl = document.getElementById('status-clock');
    if (!sectionEl || !scrollEl || !clockEl) return;

    // Session clock
    var sessionStart = Date.now();
    function updateClock() {
      var elapsed = Math.floor((Date.now() - sessionStart) / 1000);
      var h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      var m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      var s = String(elapsed % 60).padStart(2, '0');
      clockEl.textContent = h + ':' + m + ':' + s;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Scroll % and current section
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      scrollEl.textContent = pct + '%';

      var current = 'hero';
      sections.forEach(function (sec) {
        if (scrollTop + 160 >= sec.offsetTop) {
          current = sec.id;
        }
      });
      sectionEl.textContent = current;
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     10. Terminal easter egg
     ------------------------------------------------------------------ */
  function setupTerminal() {
    var input = document.getElementById('terminal-input');
    var output = document.getElementById('terminal-output');
    if (!input || !output) return;

    var commands = {
      help: function () {
        return [
          { cls: 'cmd-highlight', text: 'Available commands:' },
          { cls: 'cmd-result', text: '  help          — show this message' },
          { cls: 'cmd-result', text: '  whoami        — about me' },
          { cls: 'cmd-result', text: '  ls            — list sections' },
          { cls: 'cmd-result', text: '  cat about.txt — short bio' },
          { cls: 'cmd-result', text: '  skills        — list skills' },
          { cls: 'cmd-result', text: '  contact       — contact info' },
          { cls: 'cmd-result', text: '  status        — current status' },
          { cls: 'cmd-result', text: '  clear         — clear terminal' },
          { cls: 'cmd-result', text: '  sudo hire me  — :)' }
        ];
      },
      whoami: function () {
        return [
          { cls: 'cmd-highlight', text: 'Nikita Sonkin' },
          { cls: 'cmd-result', text: 'Data Analyst (BI) · AI Solutions Developer' },
          { cls: 'cmd-result', text: 'Rishon LeZion, IL' },
          { cls: 'cmd-result', text: '3 production systems · 23+ AI agents deployed' }
        ];
      },
      ls: function () {
        return [
          { cls: 'cmd-highlight', text: 'projects/  experience/  skills/  contact.txt  resume_en.pdf  resume_he.pdf' }
        ];
      },
      'cat about.txt': function () {
        return [
          { cls: 'cmd-result', text: 'I build end-to-end production systems — not prototypes.' },
          { cls: 'cmd-result', text: 'Multi-agent AI platforms, automated data pipelines,' },
          { cls: 'cmd-result', text: 'BI dashboards, and full-stack AI-powered tools.' },
          { cls: 'cmd-result', text: '' },
          { cls: 'cmd-result', text: 'B.A. Management Information Systems · IDF Paratroopers.' }
        ];
      },
      skills: function () {
        return [
          { cls: 'cmd-highlight', text: 'data:     PostgreSQL · SQL · Power BI · GA4 · ETL' },
          { cls: 'cmd-highlight', text: 'code:     Python · TypeScript · React · Node.js' },
          { cls: 'cmd-highlight', text: 'ai:       Claude AI · BART · SentenceTransformer' },
          { cls: 'cmd-highlight', text: 'devops:   Git · GitHub Actions · Railway · Playwright' }
        ];
      },
      contact: function () {
        return [
          { cls: 'cmd-result', text: 'email:    nikita.sonkin@gmail.com' },
          { cls: 'cmd-result', text: 'linkedin: /in/nikita-sonkin' },
          { cls: 'cmd-result', text: 'github:   /nikitasonkin' },
          { cls: 'cmd-result', text: 'phone:    053-625-6978' }
        ];
      },
      status: function () {
        return [
          { cls: 'cmd-highlight', text: 'STATUS: Available for hire' },
          { cls: 'cmd-result', text: 'Currently building: Investor (24-agent AI platform)' },
          { cls: 'cmd-result', text: 'Looking for: Data Analyst · AI Developer roles' },
          { cls: 'cmd-result', text: 'Location: Hybrid / Remote (Gush Dan)' }
        ];
      },
      'sudo hire me': function () {
        return [
          { cls: 'cmd-highlight', text: '🎉 Great decision! Sending my resume...' },
          { cls: 'cmd-result', text: 'Just kidding — but seriously, let\'s talk!' },
          { cls: 'cmd-result', text: 'nikita.sonkin@gmail.com | linkedin.com/in/nikita-sonkin' }
        ];
      },
      clear: function () { return 'clear'; }
    };

    input.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var cmd = input.value.trim().toLowerCase();
      if (!cmd) return;
      input.value = '';

      playClick();

      // Echo command
      var echo = document.createElement('div');
      echo.className = 'line cmd-echo';
      echo.textContent = '$ ' + cmd;
      output.appendChild(echo);

      if (cmd === 'clear') {
        output.innerHTML = '<div class="line dim">Terminal cleared. Type help for commands.</div>';
        return;
      }

      var handler = commands[cmd];
      if (!handler) {
        var err = document.createElement('div');
        err.className = 'line';
        err.style.color = 'var(--status-wip)';
        err.textContent = 'command not found: ' + cmd + '. Type help for available commands.';
        output.appendChild(err);
      } else {
        var lines = handler();
        lines.forEach(function (l) {
          var el = document.createElement('div');
          el.className = 'line ' + l.cls;
          el.textContent = l.text;
          output.appendChild(el);
        });
      }

      output.scrollTop = output.scrollHeight;
    });
  }

  /* ------------------------------------------------------------------
     11. Sound effects (Web Audio API)
     ------------------------------------------------------------------ */
  var soundEnabled = true;
  var audioCtx = null;

  function initAudio() {
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { /* no audio support */ }
  }

  function playBeep(freq, duration) {
    if (!soundEnabled || !audioCtx) return;
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = freq;
    osc.type = 'square';
    gain.gain.value = 0.03;
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playClick() {
    playBeep(800, 0.05);
  }

  function setupSoundToggle() {
    var btn = document.getElementById('sound-toggle');
    if (!btn) return;

    btn.classList.add('active');

    btn.addEventListener('click', function () {
      initAudio();
      soundEnabled = !soundEnabled;
      btn.textContent = soundEnabled ? '♪ on' : '♪ off';
      btn.classList.toggle('active', soundEnabled);
      if (soundEnabled) playBeep(600, 0.1);
    });

    // Init audio on first user gesture
    function onFirstGesture() {
      initAudio();
      document.removeEventListener('click', onFirstGesture);
      document.removeEventListener('keydown', onFirstGesture);
    }
    document.addEventListener('click', onFirstGesture);
    document.addEventListener('keydown', onFirstGesture);

    // Click sounds on interactive elements
    document.addEventListener('click', function (e) {
      if (!soundEnabled) return;
      var target = e.target;
      if (target.matches('.cta, .tag, .link-tag, .nav-links a, button')) {
        initAudio();
        playClick();
      }
    });
  }

  /* ------------------------------------------------------------------
     12. GitHub activity (public API, no auth)
     ------------------------------------------------------------------ */
  function showGitHubFallback(actEl, statsEl) {
    actEl.innerHTML =
      '<div class="gh-event"><span class="gh-event-type">Push</span> <span class="gh-event-repo">nikitasonkin/Portfolio.io</span> <span class="gh-event-date">recently</span></div>' +
      '<div class="gh-event"><span class="gh-event-type">Push</span> <span class="gh-event-repo">nikitasonkin/CyberNewsBot</span> <span class="gh-event-date">recently</span></div>' +
      '<div class="gh-event"><span class="gh-event-type">Create</span> <span class="gh-event-repo">nikitasonkin/Investor</span> <span class="gh-event-date">recently</span></div>';
    if (statsEl) {
      statsEl.innerHTML =
        '<span><span class="gh-stat-val">6+</span> public repos</span>' +
        '<span class="dim">// live data unavailable</span>';
    }
  }

  function loadGitHubActivity() {
    var actEl = document.getElementById('gh-activity');
    var statsEl = document.getElementById('gh-stats');
    if (!actEl) return;

    fetch('https://api.github.com/users/nikitasonkin/events/public?per_page=5')
      .then(function (r) {
        if (!r.ok) throw new Error('API error');
        return r.json();
      })
      .then(function (events) {
        if (!Array.isArray(events) || !events.length) {
          showGitHubFallback(actEl, statsEl);
          return;
        }

        actEl.innerHTML = '';
        events.forEach(function (ev) {
          var type = ev.type.replace('Event', '');
          var repo = ev.repo ? ev.repo.name : '';
          var date = new Date(ev.created_at);
          var ago = timeAgo(date);

          var div = document.createElement('div');
          div.className = 'gh-event';
          div.innerHTML = '<span class="gh-event-type">' + escHtml(type) + '</span> ' +
            '<span class="gh-event-repo">' + escHtml(repo) + '</span>' +
            '<span class="gh-event-date">' + ago + '</span>';
          actEl.appendChild(div);
        });
      })
      .catch(function () {
        showGitHubFallback(actEl, statsEl);
      });

    // Public repos count
    fetch('https://api.github.com/users/nikitasonkin')
      .then(function (r) {
        if (!r.ok) throw new Error('API error');
        return r.json();
      })
      .then(function (user) {
        if (!statsEl || !user.public_repos) return;
        statsEl.innerHTML =
          '<span><span class="gh-stat-val">' + user.public_repos + '</span> public repos</span>' +
          '<span><span class="gh-stat-val">' + (user.followers || 0) + '</span> followers</span>';
      })
      .catch(function () {});
  }

  function timeAgo(date) {
    var seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    var minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + 'm ago';
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + 'h ago';
    var days = Math.floor(hours / 24);
    return days + 'd ago';
  }

  function escHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  function init() {
    setLastUpdated();
    setupActiveNav();
    setupCopyButtons();
    setupHamburger();
    setupBackToTop();
    setupStatusBar();
    setupTerminal();
    setupSoundToggle();
    loadGitHubActivity();

    runBootSequence(function () {
      setupScrollReveal();
      setupCounters();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
