/* ==========================================================================
   JH Stat — jhstat.co.uk
   Minimal vanilla JavaScript.

   Everything here is a progressive enhancement. The site is fully readable
   and navigable with JavaScript disabled.

   1. Mark the document as JS-enabled
   2. Mobile navigation menu
   3. Header shadow on scroll
   4. Reveal-on-scroll animations
   5. Publication / blog filtering (only runs if a filter bar is present)
   6. Current year in the footer
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. Mark the document as JS-enabled
     CSS uses html:not(.js) to keep .reveal content visible without JS.
     ------------------------------------------------------------------ */
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------------------------------
       2. Mobile navigation menu
       ---------------------------------------------------------------- */
    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-navigation');

    if (navToggle && nav) {
      var closeNav = function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      };

      navToggle.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close when a navigation link is followed
      nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
          closeNav();
        }
      });

      // Close on Escape and return focus to the toggle button
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
          closeNav();
          navToggle.focus();
        }
      });

      // Close when clicking outside the menu
      document.addEventListener('click', function (event) {
        if (!nav.classList.contains('is-open')) { return; }
        if (nav.contains(event.target) || navToggle.contains(event.target)) { return; }
        closeNav();
      });

      // Reset state when resizing up to desktop width
      var resizeTimer;
      window.addEventListener('resize', function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () {
          if (window.innerWidth > 960) { closeNav(); }
        }, 150);
      });
    }

    /* ----------------------------------------------------------------
       3. Header shadow on scroll
       ---------------------------------------------------------------- */
    var header = document.querySelector('.site-header');

    if (header) {
      var updateHeader = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      updateHeader();
      window.addEventListener('scroll', updateHeader, { passive: true });
    }

    /* ----------------------------------------------------------------
       4. Reveal-on-scroll animations
       Skipped entirely when the visitor prefers reduced motion, or when
       IntersectionObserver is unavailable (elements are simply shown).
       ---------------------------------------------------------------- */
    var revealItems = document.querySelectorAll('.reveal');
    var prefersReducedMotion = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (revealItems.length) {
      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        Array.prototype.forEach.call(revealItems, function (el) {
          el.classList.add('is-visible');
        });
      } else {
        var observer = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

        Array.prototype.forEach.call(revealItems, function (el) {
          observer.observe(el);
        });
      }
    }

    /* ----------------------------------------------------------------
       5. Filtering for publications and blog cards
       Requires: a .filter-bar containing .filter-btn[data-filter] buttons,
       and items carrying data-tags="tag1 tag2".
       Without JavaScript all items simply remain visible.
       ---------------------------------------------------------------- */
    var filterBars = document.querySelectorAll('.filter-bar[data-filter-target]');

    Array.prototype.forEach.call(filterBars, function (bar) {
      var targetSelector = bar.getAttribute('data-filter-target');
      var targetList = document.querySelector(targetSelector);
      if (!targetList) { return; }

      var items = targetList.querySelectorAll('[data-tags]');
      var buttons = bar.querySelectorAll('.filter-btn');
      var status = document.querySelector(bar.getAttribute('data-filter-status') || '');

      bar.addEventListener('click', function (event) {
        var button = event.target.closest('.filter-btn');
        if (!button) { return; }

        var filter = button.getAttribute('data-filter') || 'all';
        var shown = 0;

        Array.prototype.forEach.call(buttons, function (b) {
          b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
        });

        Array.prototype.forEach.call(items, function (item) {
          var tags = (item.getAttribute('data-tags') || '').split(/\s+/);
          var match = filter === 'all' || tags.indexOf(filter) !== -1;
          item.hidden = !match;
          if (match) { shown += 1; }
        });

        if (status) {
          status.textContent = shown + (shown === 1 ? ' item shown' : ' items shown');
        }
      });
    });

    /* ----------------------------------------------------------------
       6. Current year in the footer
       ---------------------------------------------------------------- */
    var yearSlots = document.querySelectorAll('[data-current-year]');
    var year = String(new Date().getFullYear());

    Array.prototype.forEach.call(yearSlots, function (slot) {
      slot.textContent = year;
    });

  });
})();
