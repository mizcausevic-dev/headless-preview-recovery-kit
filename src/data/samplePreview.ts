import type { PreviewSession, PublishLane, RecoveryRule } from "../types/preview";

export const previewSessions: PreviewSession[] = [
  {
    slug: "/inspiration/kitchen-backsplash-trends",
    owner: "Editorial ops",
    status: "broken",
    draftUrl: "/api/preview?slug=/inspiration/kitchen-backsplash-trends&token=preview",
    cmsState: "Draft updated",
    frontendState: "Stale route cache",
    authState: "Preview token valid",
    leadBreak: "The frontend is rendering the last published snapshot instead of the current draft.",
    nextAction: "Invalidate the route cache and rebuild the preview resolver for draft-first fetches.",
  },
  {
    slug: "/support/install-checklist",
    owner: "Support content",
    status: "healthy",
    draftUrl: "/api/preview?slug=/support/install-checklist&token=preview",
    cmsState: "Draft updated",
    frontendState: "Fresh draft render",
    authState: "Signed preview cookie",
    leadBreak: "The preview path is healthy and reflecting the current draft correctly.",
    nextAction: "Keep the signed-cookie preview path as the stable pattern.",
  },
  {
    slug: "/collections/spring-launch",
    owner: "Growth team",
    status: "broken",
    draftUrl: "/api/preview?slug=/collections/spring-launch&token=preview",
    cmsState: "Scheduled publish",
    frontendState: "Missing unpublished assets",
    authState: "Preview access granted",
    leadBreak: "Scheduled content loads, but linked media and collection cards still resolve to published-only state.",
    nextAction: "Load draft-linked assets through the same preview session and staging resolver.",
  },
  {
    slug: "/compare/peel-and-stick-vs-tile",
    owner: "SEO content",
    status: "watch",
    draftUrl: "/api/preview?slug=/compare/peel-and-stick-vs-tile&token=preview",
    cmsState: "Draft updated",
    frontendState: "Fresh content, stale meta",
    authState: "Preview token valid",
    leadBreak: "The body content updates, but meta tags and comparison blocks still use published props.",
    nextAction: "Unify metadata and component data loaders under one draft-aware preview payload.",
  },
  {
    slug: "/retail/partner-kit",
    owner: "Partnerships",
    status: "watch",
    draftUrl: "/api/preview?slug=/retail/partner-kit&token=preview",
    cmsState: "Private draft",
    frontendState: "Draft render works",
    authState: "Role-based access mismatch",
    leadBreak: "The page renders, but the wrong partner role can still access the preview lane.",
    nextAction: "Tighten preview access checks to role-safe signed session scopes.",
  },
];

export const recoveryRules: RecoveryRule[] = [
  {
    surface: "Draft routing",
    rule: "Always resolve preview requests through a draft-aware route manifest before the frontend path lookup.",
    failureMode: "Preview requests hit published route maps and quietly ignore the draft.",
    owner: "Frontend platform",
  },
  {
    surface: "Auth preview",
    rule: "Use short-lived signed preview sessions instead of permanent query-token access.",
    failureMode: "Preview links remain valid too long or leak across roles.",
    owner: "Platform security",
  },
  {
    surface: "Scheduled publish validation",
    rule: "Preflight scheduled pages against draft media, metadata, and related content before publish time.",
    failureMode: "Pages publish with missing assets or stale metadata even though preview looked acceptable.",
    owner: "Release ops",
  },
  {
    surface: "Cache invalidation",
    rule: "Invalidate draft route caches whenever CMS revision state changes.",
    failureMode: "Editors think the preview is live, but the frontend is still showing the last published snapshot.",
    owner: "Performance platform",
  },
];

export const publishLanes: PublishLane[] = [
  {
    lane: "Editorial preview lane",
    status: "blocked",
    evidence: "Two major drafts still render stale or partial preview state.",
    nextMove: "Repair route and asset resolution before the next editorial release window.",
  },
  {
    lane: "Support preview lane",
    status: "ready",
    evidence: "Draft content, cookies, and route resolution are aligned and stable.",
    nextMove: "Use this lane as the baseline implementation pattern for other surfaces.",
  },
  {
    lane: "Campaign publish lane",
    status: "review",
    evidence: "Scheduled preview works partially, but asset and metadata dependencies still drift.",
    nextMove: "Add scheduled publish preflight checks before the next campaign goes out.",
  },
];
