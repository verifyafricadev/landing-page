/**
 * PostHog analytics
 *
 * PostHog is initialised immediately but with a minimal config so its init
 * overhead is tiny. The heavy session-recording SDK is NOT loaded until after
 * the page is interactive, keeping it off the critical path.
 *
 * Safe to call posthog.capture() anywhere — posthog-js queues events
 * internally if called before init completes.
 */
import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = 'https://us.i.posthog.com';

/**
 * Call once at the top of main.tsx before React renders.
 */
export function initPostHog(): void {
  if (typeof window === 'undefined') return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,

    // ── Capture settings ────────────────────────────────────────────────────
    autocapture: true,
    // We fire manual $pageview on route change in App.tsx instead
    capture_pageview: false,
    // Disable session recording on init — load it deferred to keep
    // the recording SDK off the critical paint path
    disable_session_recording: true,

    // ── Privacy / consent ───────────────────────────────────────────────────
    opt_out_capturing_by_default: false,
    respect_dnt: true,
    cross_subdomain_cookie: false,
    secure_cookie: true,

    // Defer the loaded callback so it doesn't run during first render
    loaded: (ph) => {
      // Re-enable session recording after the page is idle so the recording
      // SDK initialisation doesn't compete with LCP / TTI
      const enableRecording = () => {
        ph.startSessionRecording();
      };
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(enableRecording, { timeout: 5000 });
      } else {
        setTimeout(enableRecording, 3000);
      }
    },
  });
}

export { posthog };
