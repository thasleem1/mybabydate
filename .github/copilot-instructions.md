## Purpose

Short, actionable guidance for AI coding agents working on this repository (a small static web app: Baby Due Date Calculator).

Keep suggestions concrete and tied to the existing codebase and conventions. This project is a static HTML/CSS/JS site intended for GitHub Pages—there is no build step, bundler, or backend.

## Quick architecture summary

- Single-page-ish static site consisting of `index.html`, `style.css`, and `script.js`.
- `index.html` contains the layout: a hamburger-controlled sidebar (`.hamburger`, `.sidebar`) and a `.calculator` section where inputs and outputs live.
- `script.js` contains DOM wiring, the EDD calculation, minimal validation, and UI toggles (hamburger/aside behavior).
- Assets: `images/` and an experimental `scripts/` folder (`test.html.txt`) — treat `script.js` as the canonical app logic unless explicitly refactoring to modules.

## When you modify code — rules for safe, useful changes

- Preserve the static-site approach: do not introduce build tooling, module bundlers, or backend services unless the user requests it.
- Keep JS changes in `script.js` by default. If splitting into modules, add a short note in `README.md` describing the change and how to run locally.
- Maintain the current UX behavior: the hamburger toggles `.sidebar.active`, the sidebar auto-closes on outside clicks, and the calculator output is hidden until a calculation is performed.

## Concrete patterns and examples (copy these when applicable)

- LMP date bounding: `script.js` sets `lmpInput.setAttribute('max', <today>)` and a `min` to one year prior. When changing date logic, keep these bounds to avoid future-dates and unreasonable LMPs.

- Cycle length options: populated programmatically in `script.js` with

  for (let i = 20; i <= 45; i++) { /* create option; default 28 */ }

  If you change the range, update both generation and any UX help text that references a 28-day default.

- EDD calculation: the algorithm is implemented in `script.js` (add 1 year, subtract 3 months, add 7 days, plus cycle adjustment). If updating calculation, preserve existing tests or add a small test snippet in a new HTML file to demonstrate behavior.

- UI toggles: toggling the sidebar uses `sidebar.classList.toggle('active')`. Keep this pattern when adding new UI states.

## Local development & testing

- There is no build. To run locally:

  - Open `index.html` directly in a browser for quick checks, or
  - Serve the folder for a more realistic environment (recommended):

    python -m http.server 8000

  or use VS Code Live Server. Confirm the date input `max` behavior and hamburger toggling after changes.

## Deployment

- This project is intended for GitHub Pages. The README documents enabling Pages on the `main` branch. Do not add a complex CI/CD pipeline unless the user requests it.

## Files to look at for examples

- `index.html` — app structure, semantic elements, navigation links.
- `script.js` — DOM wiring, validation, EDD calculation, and UI state changes.
- `style.css` — responsive, mobile-first styles and the sidebar/hamburger rules.
- `README.md` — contains deployment notes and project intent (static, mobile-friendly).

## Things *not* to change without explicit instruction

- Do not change the deployment target (GitHub Pages) or add server-side code.
- Do not replace the simple JS logic with heavy frameworks (React/Vue) unless asked.

## Examples of good PRs

- Small, well-scoped changes with before/after screenshots for UI tweaks.
- Additions that include a short README update when behavior or public-facing text changes (e.g., changing the cycle-length default).

## If you need clarification

- Ask: "Should I introduce a build step or remain a static site?" or "Do you want this app converted into a multi-page or SPA framework?"

---
Please review this draft and tell me any missing specifics you want included (coding style, commit message format, or allowed third-party libs).
