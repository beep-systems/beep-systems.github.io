# BEEP SYSTEMS

Static engineering portfolio for https://beep.systems/. Plain HTML, CSS and
JavaScript; no package installation, build step or backend.

## Local preview

Serve the repository root with any static HTTP server. For example, with Python:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080/. Use HTTP rather than opening `index.html` directly:
asset paths start at the host root. Stop the server with Ctrl+C.

## Content

The initial English HTML contains the profile, five projects and contact links.
These remain available without JavaScript. The EN/DE language switcher appears
in the header after JavaScript initializes successfully.

Project order: QuadroFleet, FSK Comm, VoluScape, VentureUnvault, Drum Machine.

To update a project:

1. Update its URL and English/German descriptions in the `projects` registry in
   `assets/app.js`. Keep claims grounded in the project and its actual status.
2. Mirror the English text and URL in the matching `data-project` article in
   `index.html`. This is the fallback for disabled or failed JavaScript.
3. For a new project, add its article with `summary`, `technical` and `link`
   fields so language switching updates the new article as well. Project cards
   contain a description, technical details and a link; there are no status lines.
4. Update page description, Open Graph and Twitter metadata when appropriate.
   Verify external links before adding them. Leave an unavailable demo as plain
   text with an explicit status instead of advertising a broken link.
5. Check fallback HTML against the initialized English page to catch drift.

VoluScape is experimental; its tools use Spirula, SuperSplat and PlayCanvas.
Do not imply an accepted reconstruction quality or an implemented backend/worker.
Do not add unverified performance figures or authorship claims.

VentureUnvault is live at https://ventureunvault.beep.systems/ and has no separate
status line. Its description highlights the n8n/PostgreSQL/Gemini pipeline and
credits Telecast as the website foundation. Older deployment notes in the source
project do not override the owner's confirmation that it is launched.

## Language switching

Use EN or DE in the header. The selected button has a distinct appearance and
`aria-pressed="true"`; accessible labels and the group label follow the page
language. Tab/Shift+Tab navigate buttons and links; Enter/Space activate buttons.
Changing language retains focus on the button and does not scroll the page.

English is the default. Explicit language selection persists in
`localStorage['beep-systems:locale']`; only `en` and `de` are accepted. Blocked
storage falls back to English on reload and permits language changes in memory.
A failed write does not interrupt switching; the previous stored preference may
be restored on reload. Language changes update page content, accessible labels
and `html.lang`. Contacts and project links use normal same-tab navigation.
Without JavaScript the English page remains complete and the switcher is hidden.

## Validation before publishing

No test framework is required. Check the following in Chrome and Edge:

- All projects/contacts with JavaScript disabled and enabled; no console errors
  or missing assets. Verify English fallback matches initialized content.
- EN/DE buttons, selected appearance/`aria-pressed`, translated accessible labels
  and `html.lang`.
- Tab/Shift+Tab, Enter/Space activation, visible focus and normal link/text clicks.
  Switching language must not move focus or scroll; reduced motion disables CRT
  background animations.
- Existing saved locales, invalid saved locale, unavailable storage and failed
  writes. Language switching must work in the current session.
- Widths 360, 768 and 1440 px in both languages: no horizontal overflow or clipped
  controls/links. Check all external destinations over HTTPS.

The canonical URL and social image remain unchanged. No additional indexed
routes, publishing automation or DNS changes are required by this update.

### Historical validation: version with interactive terminal — 2026-10-25

The earlier version with the interactive terminal passed an ad hoc Playwright
check against installed Chrome and Edge (headless):
English HTML/JS project parity, commands in both languages, quick commands,
normalization, safe text output, history/draft restoration, completion with and
without selection, Tab/Shift+Tab, focus retention, locale persistence/invalid
values, unavailable storage, reduced motion and widths 360/768/1440 px. No browser
console errors or failed local resources were observed. Desktop and mobile-width
screenshots were visually inspected; this is not a physical mobile-device check.
The Ctrl+L handler check confirmed the event was not cancelled; browser address-bar
interaction was not verified in headless mode.

`node --check assets/app.js` and `git diff --check` passed. All four project HTTPS
URLs returned HTTP 200 with the expected page titles. No deployment was performed.

### Historical validation: language switcher, four projects — 2026-10-25

Passed an ad hoc Playwright check against installed Chrome and Edge (headless):

- No terminal, history, command buttons, input or form remain in the page.
- English content matches the no-JavaScript fallback. With JS disabled or its
  request deliberately aborted, all four projects and contacts remain available
  and the language switcher stays hidden.
- EN/DE switching updates page text, `html.lang`, accessible labels and exactly
  one pressed button. Links remain identical; the active button is visually
  distinct. Focus is retained and switching at the header does not scroll.
- Tab/Shift+Tab, Enter/Space and visible keyboard focus work. Visible language
  buttons have at least 44 x 44 CSS pixels of clickable area.
- Saved German preference, invalid locale fallback, blocked storage access and
  failed writes work as documented. Reduced motion disables both CRT animations.
- EN/DE layouts at 360/768/1440 px have no horizontal overflow or clipped links
  or buttons. Desktop English and mobile-width German screenshots were visually
  inspected; physical mobile devices were not tested.

No console errors or failed local resources were observed in normal and
storage-error scenarios; the failed-JS scenario intentionally aborts the script.
`node --check assets/app.js` and `git diff --check` passed. No deployment was
performed.

### Historical validation: five projects with VentureUnvault — 2026-10-25

Passed an ad hoc Playwright check against installed Chrome and Edge (headless):
five-project order, English HTML/JS parity, translated VentureUnvault and intro,
no VentureUnvault status element, four preserved nonempty status lines, website
link and updated description/Open Graph/Twitter metadata. EN/DE selection,
persisted German preference and Tab/Enter/Space navigation passed.

Both languages passed layout checks at 360/768/1440 px: no horizontal overflow
or clipped links/buttons, one column at 360 px and two at 768/1440 px. The last
card retains normal column width. Desktop English and mobile-width German
screenshots were visually inspected; physical mobile devices were not tested.
No console errors or failed local resources were observed.

`node --check assets/app.js` and `git diff --check` passed. The public VentureUnvault
URL returned HTTP 200 with title `VentureUnvault` during planning. No deployment
was performed.
