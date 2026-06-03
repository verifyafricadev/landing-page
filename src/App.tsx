import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { DemoModalProvider, useDemoModal } from "./hooks/useDemoModal";
import DemoRequestForm from "./pages/home/components/DemoRequestForm";
import CookieConsentBanner from "./components/feature/CookieConsentBanner";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { posthog } from "./lib/posthog";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fire a PostHog pageview on every SPA route change.
    // PostHog's built-in capture_pageview is disabled so we control this manually,
    // ensuring the full URL (including search params) is always captured.
    posthog.capture('$pageview', {
      $current_url: window.location.href,
    });
  }, [pathname, search]);

  return null;
}

function DemoModal() {
  const { isOpen, closeDemo } = useDemoModal();
  return <DemoRequestForm isOpen={isOpen} onClose={closeDemo} />;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <DemoModalProvider>
          <ScrollToTop />
          <AppRoutes />
          <DemoModal />
          <CookieConsentBanner />
        </DemoModalProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
