/**
 * analytics.ts
 *
 * Typed PostHog event helpers. Import `track` anywhere in the app.
 * All events are no-ops if PostHog hasn't been initialised (e.g. user opted out).
 *
 * Naming convention: <noun>_<past_tense_verb>
 * e.g. demo_cta_clicked, contact_form_submitted
 */
import { posthog } from './posthog';

// ── Event catalogue ──────────────────────────────────────────────────────────

export type AnalyticsEvent =
  // Demo funnel
  | { event: 'demo_cta_clicked';        props: { source: string; location: string } }
  | { event: 'demo_modal_opened';       props: { source: string } }
  | { event: 'demo_form_submitted';     props: { company_size: string; industry: string; has_phone: boolean } }
  // Contact
  | { event: 'contact_form_submitted';  props: { subject: string } }
  // Case studies
  | { event: 'case_study_clicked';      props: { client: string; industry: string; featured: boolean } }
  // Blog
  | { event: 'article_viewed';          props: { article_id: string; category: string; author: string } }
  | { event: 'article_demo_cta_clicked';props: { article_id: string } }
  | { event: 'article_shared';          props: { article_id: string; channel: 'twitter' | 'linkedin' | 'copy_link' } }
  // Pricing
  | { event: 'pricing_plan_clicked';    props: { plan: string } }
  // Resources
  | { event: 'resource_unlocked';       props: { resource_id: string; resource_title: string; email_domain: string } }
  | { event: 'resource_downloaded';    props: { resource_id: string; resource_title: string; type: 'pdf' | 'inline' } }
  | { event: 'resource_shared';        props: { resource_id: string; resource_title: string; channel: 'linkedin' | 'twitter' | 'copy_link' } }
  | { event: 'resource_viewed';        props: { resource_id: string; resource_title: string } };

// ── Core helper ──────────────────────────────────────────────────────────────

type EventName = AnalyticsEvent['event'];
type EventProps<E extends EventName> = Extract<AnalyticsEvent, { event: E }>['props'];

export function track<E extends EventName>(event: E, props: EventProps<E>): void {
  try {
    posthog.capture(event, props as Record<string, unknown>);
  } catch {
    // Never let analytics errors bubble up to the user
  }
}
