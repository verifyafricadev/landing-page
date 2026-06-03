// Non-blocking stylesheet loader + resource prefetcher
// Executed via `async` attribute — never blocks HTML parser or render tree.
//
// Strategy:
//   1. Remixicon CSS  → inject at setTimeout(0) — inline @font-face in
//      index.html covers above-fold icons immediately; this adds the full
//      glyph class map right after JS parse, before user interaction.
//   2. Google Fonts   → defer to requestIdleCallback — font-display:swap means
//      text renders immediately with system font; Inter swaps in silently.
//   3. Route prefetch → idle callback, low priority, fast connections only.
//
// Neither stylesheet is render-critical: the inline <style> in index.html
// covers the above-fold skeleton, and font-display:swap handles text.

(function (d, nav) {
  /**
   * Inject a stylesheet completely off the critical path.
   * Uses the print-flip trick so the browser never treats it as render-blocking.
   */
  function loadCSS(href, useIdle) {
    function inject() {
      if (d.querySelector('link[href="' + href + '"]')) return;
      var ss = d.createElement('link');
      ss.rel = 'stylesheet';
      ss.href = href;
      // Start as print — browser fetches at lowest network priority,
      // never competes with JS bundle or LCP image
      ss.media = 'print';
      ss.onload = function () { ss.media = 'all'; };
      d.head.appendChild(ss);
    }

    if (useIdle && typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(inject, { timeout: 2500 });
    } else if (useIdle) {
      setTimeout(inject, 300);
    } else {
      // High-priority non-blocking: after current task, before idle
      setTimeout(inject, 0);
    }
  }

  /**
   * Prefetch a list of URLs as documents during idle time.
   * Only fires on fast connections to avoid wasting mobile data.
   */
  function prefetchRoutes(paths) {
    if (!('requestIdleCallback' in window)) return;
    requestIdleCallback(function () {
      paths.forEach(function (path) {
        if (d.querySelector('link[rel="prefetch"][href="' + path + '"]')) return;
        var l = d.createElement('link');
        l.rel = 'prefetch';
        l.href = path;
        l.as = 'document';
        d.head.appendChild(l);
      });
    }, { timeout: 5000 });
  }

  // ── Connection-aware loading ───────────────────────────────────────────────
  var isSlow = false;
  try {
    var conn = nav && nav.connection;
    isSlow = !!(conn && (conn.saveData || /^(slow-2g|2g)$/.test(conn.effectiveType || '')));
  } catch (e) { /* ignore — treat as fast */ }

  if (!isSlow) {
    // Remixicon — icons visible above fold, needs class map loaded fast
    loadCSS('https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css', false);

    // Google Fonts — truly idle: font-display:swap makes this non-critical
    loadCSS(
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
      true
    );

    // ── Route prefetching ──────────────────────────────────────────────────
    // Top-level pages — high probability user will visit these
    prefetchRoutes(['/blog', '/about', '/case-studies', '/docs', '/contact', '/support']);

    // Blog articles — prefetch on idle after top-level pages are done.
    // Two separate idle callbacks so they don't block each other.
    if ('requestIdleCallback' in window) {
      requestIdleCallback(function () {
        prefetchRoutes([
          '/blog/understanding-kyc-regulations-west-africa-2025',
          '/blog/aml-screening-best-practices-african-fintechs',
          '/blog/biometric-verification-guide-africa',
          '/blog/south-africa-fica-amendments-2025',
        ]);
      }, { timeout: 8000 });

      requestIdleCallback(function () {
        prefetchRoutes([
          '/blog/igaming-compliance-east-africa',
          '/blog/building-risk-based-approach-customer-due-diligence',
          '/blog/case-study-paystack-identity-verification',
          '/blog/case-study-fx-broker-compliance-automation',
          '/blog/gdpr-vs-ndpr-comparison-guide',
        ]);
      }, { timeout: 12000 });
    }
  }

}(document, navigator));
