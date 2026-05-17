import { previewSessions, publishLanes, recoveryRules } from "../data/samplePreview";
import type { Summary } from "../types/preview";

const statusRank = {
  broken: 0,
  watch: 1,
  healthy: 2,
} as const;

export function sessionBoard() {
  return [...previewSessions].sort((left, right) => statusRank[left.status] - statusRank[right.status]);
}

export function ruleBoard() {
  return [...recoveryRules];
}

export function publishBoard() {
  return [...publishLanes];
}

export function summary(): Summary {
  const sessionCount = previewSessions.length;
  const brokenCount = previewSessions.filter((item) => item.status === "broken").length;
  const watchCount = previewSessions.filter((item) => item.status === "watch").length;
  const healthyCount = previewSessions.filter((item) => item.status === "healthy").length;
  const recoveryScore = Math.round(
    previewSessions.reduce((total, item) => {
      if (item.status === "healthy") return total + 100;
      if (item.status === "watch") return total + 70;
      return total + 36;
    }, 0) / sessionCount,
  );

  return {
    sessionCount,
    brokenCount,
    watchCount,
    healthyCount,
    recoveryScore,
    leadRecommendation:
      "Fix stale route resolution and draft-linked media first, because those are the preview failures most likely to break editorial trust and launch readiness.",
  };
}

export function payload() {
  return {
    summary: summary(),
    sessions: sessionBoard(),
    rules: ruleBoard(),
    publishLanes: publishBoard(),
  };
}
