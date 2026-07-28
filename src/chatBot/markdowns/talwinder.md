# TalwinderCSS — Hindi-Inspired CSS Utility Framework

## What is TalwinderCSS?

TalwinderCSS (npm package: `talwinder-ji-ki-css`) is a **custom utility-first CSS framework** that Mehul built from scratch and published to npm. It works like Tailwind CSS but with **Hindi-inspired class names** — instead of `bg-red-500` you write `bg-laal-500`, instead of padding you write `chaiPad-p-4`, instead of font-size you write `likhawat-4xl`.

The engine runs entirely **client-side** — it scans the DOM for elements with these Hindi-inspired utility classes and dynamically injects the corresponding CSS rules into the browser, all with no build step required.

Live showcase & playground: https://talwinder.mehularora.dev/
GitHub (showcase site): https://github.com/MEHULARORA11/TalwinderCSS
GitHub (engine): https://github.com/MEHULARORA11/My-Custom-Tailwind
npm: https://www.npmjs.com/package/talwinder-ji-ki-css

---

## How the Engine Works

The npm package exposes a single function:

```js
import { runTalwinder } from "talwinder-ji-ki-css";
runTalwinder();
```

When called, it:
1. Queries the DOM for all elements that have a `class` attribute (`document.querySelectorAll("[class]")`)
2. Scans each element's class list for recognized Hindi-style utility tokens (e.g., `bg-laal-500`, `chaiPad-p-4`, `likhawat-4xl`)
3. Compiles the corresponding CSS rules (e.g., `background-color: #ef4444`, `padding: 1rem`, `font-size: 2.25rem`)
4. Injects a `<style>` tag into the document head with all discovered rules

**Important limitation**: the engine does not use a `MutationObserver`, so it is a one-time synchronous scan — it does not automatically re-run when React state changes render new class names. That's why the showcase site implements the `useTalwinder` hook.

---

## The `useTalwinder` Hook

Because the engine is a single-shot scan, the showcase site wraps it in a React `useEffect` hook:

```ts
import { useEffect } from "react";
import { runTalwinder } from "talwinder-ji-ki-css";

export function useTalwinder(deps: React.DependencyList = []) {
  useEffect(() => {
    // Monkeypatches querySelectorAll to filter out SVG elements
    // (SVG className is an SVGAnimatedString object, not a string — would crash the engine)
    const originalQuerySelectorAll = document.querySelectorAll;
    document.querySelectorAll = function(selector) {
      if (selector === "[class]") {
        const elements = originalQuerySelectorAll.call(document, selector);
        return Array.from(elements).filter(
          (el) => el && typeof el.className === "string"
        ) as any;
      }
      return originalQuerySelectorAll.apply(document, arguments as any);
    } as any;

    try {
      runTalwinder();
    } catch (e) {
      console.error("TalwinderCSS run error:", e);
    } finally {
      document.querySelectorAll = originalQuerySelectorAll; // Always restore
    }
  }, deps);
}
```

The monkeypatch is needed because SVG elements have `className` as an `SVGAnimatedString` object (not a plain string), which would crash the engine's string-based class parsing. The hook restores the original function in the `finally` block.

### Where the hook is called:

1. **Root router level** (`router.tsx`) — bound to `location.pathname`, so it re-scans on every route navigation
2. **Playground level** — bound to the active box settings so new utility classes get compiled when the user changes options in the interactive editor

---

## The Showcase Site

The showcase site (`talwinder.mehularora.dev`) is the production-quality marketing, documentation, and playground website for the framework. It has three main routes:

- **Home** (`/`) — landing hero with interactive 3D floating shapes (React Three Fiber + Three.js), color swatches, and feature highlights
- **Playground** (`/playground`) — interactive live sandbox where you can add CSS boxes, configure their properties using a visual editor, and see TalwinderCSS class names applied in real time with Framer Motion transitions for property crossfades
- **Docs** (`/docs`) — full documentation with a responsive sidebar, search functionality, and all utility class references organized by category

### Tech Stack of the Showcase Site

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Language | TypeScript |
| Routing | TanStack Router (code-based) |
| Styling (site chrome) | Tailwind CSS v4 |
| Styling (demos) | TalwinderCSS `talwinder-ji-ki-css@1.0.4` |
| 3D | React Three Fiber + Three.js |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## Naming Convention Examples

The Hindi-inspired class names follow a predictable pattern:

| TalwinderCSS class | Tailwind CSS equivalent | What it means |
|---|---|---|
| `bg-laal-500` | `bg-red-500` | laal = red in Hindi |
| `bg-neela-500` | `bg-blue-500` | neela = blue in Hindi |
| `chaiPad-p-4` | `p-4` | padding, chai-inspired naming |
| `likhawat-4xl` | `text-4xl` | likhawat = writing/typography |
| `bg-hara-500` | `bg-green-500` | hara = green in Hindi |

---

## Common Questions

**Q: What is TalwinderCSS?**
A: A custom CSS utility framework Mehul built from scratch and published to npm. It works like Tailwind CSS but uses Hindi-inspired class names like `bg-laal-500` for red, `chaiPad-p-4` for padding.

**Q: Is TalwinderCSS on npm?**
A: Yes. Install with `npm install talwinder-ji-ki-css`. The package name is `talwinder-ji-ki-css`.

**Q: How is TalwinderCSS different from Tailwind CSS?**
A: Tailwind requires a build step (PostCSS/CLI) and generates CSS at build time. TalwinderCSS runs entirely in the browser — no build step needed. Also, its class names are Hindi-inspired instead of English.

**Q: What does the showcase site (`talwinder.mehularora.dev`) contain?**
A: A full marketing + docs site built with React 19, TanStack Router, React Three Fiber (3D shapes), Framer Motion, and Tailwind v4 for layout. It includes a live interactive playground where you can build boxes with TalwinderCSS classes in real time.

**Q: What's the `useTalwinder` hook?**
A: A React wrapper around `runTalwinder()` that re-triggers the CSS scan when dependencies change (route changes or playground state updates). It also patches `querySelectorAll` to skip SVG elements which would crash the engine.

**Q: Who is "Talwinder"?**
A: It's a playful name inspired by Indian naming conventions — the "ji" suffix in the npm package name (`talwinder-ji-ki-css`) is an Indian honorific, giving the whole thing a desi personality. It's also a nod to Hitesh Choudhary's "chai" branding in the Indian dev community.
