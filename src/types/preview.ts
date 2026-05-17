export type PreviewStatus = "broken" | "watch" | "healthy";

export interface PreviewSession {
  slug: string;
  owner: string;
  status: PreviewStatus;
  draftUrl: string;
  cmsState: string;
  frontendState: string;
  authState: string;
  leadBreak: string;
  nextAction: string;
}

export interface RecoveryRule {
  surface: string;
  rule: string;
  failureMode: string;
  owner: string;
}

export interface PublishLane {
  lane: string;
  status: "blocked" | "review" | "ready";
  evidence: string;
  nextMove: string;
}

export interface Summary {
  sessionCount: number;
  brokenCount: number;
  watchCount: number;
  healthyCount: number;
  recoveryScore: number;
  leadRecommendation: string;
}
