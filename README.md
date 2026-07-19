# Lumo's Magic Mirror

A privacy-first energy scanner for parents and children ages 2–5. A grown-up privately primes the result, then Lumo turns the front-camera scan into a playful story about rest, calm, or restored energy.

## Run locally

```bash
npm install
npm run dev
```

Camera access requires `localhost` or HTTPS. Press and hold either moon on the welcome screen for about one second to open the parent controls.

## Product flow

1. The mirror waits for a grown-up.
2. A press-and-hold gesture opens the private result picker.
3. The child wakes the mirror and centers their face.
4. A six-second camera animation scans their sparkle.
5. Lumo reveals one of three unmistakable visual stories: sleeping at 1/3 energy, calm reading at 2/3, or joyful dancing at 3/3.

## Languages

The app currently supports English and German. On the first visit it resolves regional browser preferences such as `de-DE`, `de-AT`, `de-CH`, `en-GB`, and `en-US`; unsupported languages fall back to English. Grown-ups can override the detected language from the hidden parent controls, and that choice is stored locally for future visits.

All copy lives in `src/i18n/translations.js`. Add a locale to `SUPPORTED_LOCALES`, provide a matching catalog, and the catalog-parity test will catch missing keys.

When the browser supports the native `FaceDetector` API, the parent can require a face to be found before a result appears. Unsupported browsers fall back gracefully and label the option as unavailable.

## Privacy and Supabase

All camera processing stays in the browser. Frames, photos, names, and other personal data are never uploaded. Supabase is optional and records only the chosen outcome category, whether face checking was used, and a timestamp.

1. Apply `supabase/migrations/20260719000000_create_scan_events.sql` to a Supabase project.
2. Copy `.env.example` to `.env.local` and provide the public project URL and anon key.
3. Leave both values unset to disable analytics completely.

Never expose a Supabase service-role key in a `VITE_` variable.

## Cloudflare Pages

Build command: `npm run build`
Output directory: `dist`

`wrangler.toml` and `public/_headers` include the Pages output path, camera permission policy, and baseline security headers.
