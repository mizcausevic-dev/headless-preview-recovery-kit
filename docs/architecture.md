# Architecture

Headless Preview Recovery Kit is a TypeScript + Express application that renders both operator-facing HTML routes and JSON payloads from the same preview recovery model.

## Surfaces

- HTML routes provide the operational preview-recovery interface
- JSON routes expose summary, session, rule, and publish-lane data for downstream tooling

## Data model

The sample model separates:

- preview session records
- recovery rules
- publish readiness lanes

That structure keeps the app focused on headless preview reliability instead of generic CMS reporting.

## Rendering

The UI is rendered server-side as HTML through a shared shell with route-specific content sections. README proof assets are generated from real browser renders using headless Edge.
