<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the DevEvent Next.js App Router project. PostHog client-side analytics are now fully configured with event capture, error tracking, and a reverse proxy for reliable data delivery.

## Summary of changes

| File | Change |
|------|--------|
| `instrumentation-client.ts` | Created — initializes PostHog client-side with reverse proxy, error tracking, and debug mode |
| `next.config.ts` | Updated — added `/ingest` rewrites to proxy PostHog requests and `skipTrailingSlashRedirect: true` |
| `component/explore-btn.tsx` | Updated — captures `explore_events_clicked` event on button click |
| `component/event-card.tsx` | Updated — added `"use client"` directive; captures `event_card_clicked` with event title, slug, location, and date properties |
| `.env.local` | Created — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |

## Events tracked

| Event | Description | File |
|-------|-------------|------|
| `explore_events_clicked` | User clicks the "Explore Events" button on the homepage hero section | `component/explore-btn.tsx` |
| `event_card_clicked` | User clicks on an event card to view its details page | `component/event-card.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/366281/dashboard/1423308
- **Explore Events button clicks** (trend): https://us.posthog.com/project/366281/insights/uTrant9H
- **Daily active users clicking event cards** (trend): https://us.posthog.com/project/366281/insights/S1Ffis9C
- **Explore → Event card conversion funnel**: https://us.posthog.com/project/366281/insights/RO9nVqA7
- **Most clicked events by title** (bar chart by event_title): https://us.posthog.com/project/366281/insights/r7J3TG8B

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
