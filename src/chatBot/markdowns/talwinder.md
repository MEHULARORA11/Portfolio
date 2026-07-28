# TalwinderCSS — Custom CSS Framework

## What is TalwinderCSS?
TalwinderCSS is a **custom utility-first CSS framework** built by Mehul Arora, inspired by Tailwind CSS but with Mehul's own twist — including some fun and unconventional utility classes. It was **published to npm** as a real package.

## Live Demo
- **Website:** https://talwinder.mehularora.dev/
- **GitHub:** https://github.com/MEHULARORA11/TalwinderCSS
- **npm Package:** Published and installable via npm

## Tech Stack
- **HTML** — documentation and demo pages
- **CSS** — the framework itself
- **JavaScript** — build tooling and class generation

## What It Does
TalwinderCSS provides utility classes similar to Tailwind but includes:
- All the standard layout, spacing, color, and typography utilities
- Some "fun" custom classes that Mehul added for personality
- A lightweight footprint compared to the full Tailwind distribution

## Why It's Interesting
- Publishing to npm is a real engineering milestone — your code becomes a dependency that others can install
- Building a CSS framework from scratch teaches you exactly how utility-first CSS works under the hood
- It's named after Talwinder — a fun, tongue-in-cheek homage while being a serious engineering project
- Shows Mehul understands the compiler pipeline: tokenization → class map → stylesheet generation

## Technical Learnings
Mehul wrote about building this in his blog, covering:
- How utility CSS frameworks parse class names
- Static extraction during build to remove unused rules
- Designing color systems that adapt to dark/light modes via CSS variables
