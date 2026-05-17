import { publishBoard, ruleBoard, sessionBoard, summary } from "./previewService";

const productName = "Headless Preview Recovery Kit";

function shell(active: string, title: string, intro: string, content: string) {
  const current = summary();
  const links = [
    { href: "/", label: "Overview" },
    { href: "/preview-matrix", label: "Preview matrix" },
    { href: "/recovery-rules", label: "Recovery rules" },
    { href: "/publish-lane", label: "Publish lane" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" },
  ];

  const nav = links
    .map(
      (item) =>
        `<a class="nav-link${item.href === active ? " is-active" : ""}" href="${item.href}">${item.label}</a>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #08111c;
        --panel: #0d1726;
        --line: rgba(121, 187, 255, 0.14);
        --text: #eef4ff;
        --muted: #98add0;
        --accent: #74bcff;
        --accent-strong: #6d74ff;
        --bad: #ff7c96;
        --warn: #f0c969;
        --good: #78d7b2;
        --shadow: 0 24px 72px rgba(0, 0, 0, 0.34);
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, "Segoe UI", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top center, rgba(89, 117, 255, 0.18), transparent 36%),
          linear-gradient(180deg, #08111c 0%, #0a1320 100%);
      }

      a { color: inherit; text-decoration: none; }

      .page {
        max-width: 1460px;
        margin: 0 auto;
        padding: 30px 28px 46px;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        padding: 18px 22px;
        border: 1px solid var(--line);
        border-radius: 30px;
        background: rgba(9, 20, 35, 0.88);
        box-shadow: var(--shadow);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .brand-mark {
        width: 52px;
        height: 52px;
        border-radius: 18px;
        display: grid;
        place-items: center;
        font-weight: 800;
        font-size: 22px;
        color: white;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
      }

      .brand-copy strong {
        display: block;
        font-size: 14px;
      }

      .brand-copy span {
        display: block;
        margin-top: 4px;
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.18em;
      }

      .nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 12px;
      }

      .nav-link {
        padding: 14px 18px;
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.02);
        color: #d4dff5;
        font-weight: 700;
        font-size: 14px;
      }

      .nav-link.is-active {
        background: linear-gradient(135deg, #3aa8ec 0%, #6a71ff 100%);
        color: white;
        border-color: transparent;
      }

      .hero {
        margin-top: 22px;
        padding: 28px 28px 24px;
        border-radius: 32px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(12, 22, 37, 0.98) 0%, rgba(10, 18, 31, 0.96) 100%);
        box-shadow: var(--shadow);
      }

      .eyebrow {
        margin: 0 0 12px;
        color: var(--accent);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.22em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        max-width: 13ch;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(40px, 4.6vw, 72px);
        line-height: 0.96;
        letter-spacing: -0.045em;
      }

      .intro {
        max-width: 70ch;
        margin: 14px 0 0;
        color: #bbcae5;
        font-size: 18px;
        line-height: 1.45;
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 18px;
        margin-top: 24px;
      }

      .metric-card,
      .panel,
      .session-card,
      .rule-card,
      .lane-card {
        border-radius: 24px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.035);
      }

      .metric-card {
        min-height: 170px;
        padding: 18px 18px 16px;
      }

      .metric-card h2,
      .panel h2,
      .lane-card h2 {
        margin: 0;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.22em;
        color: var(--accent);
      }

      .metric-card strong {
        display: block;
        margin-top: 16px;
        font-size: 54px;
        line-height: 0.95;
      }

      .metric-card p {
        margin: 12px 0 0;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.45;
      }

      .section-grid {
        display: grid;
        grid-template-columns: 1.35fr 1fr;
        gap: 20px;
        margin-top: 22px;
      }

      .panel {
        padding: 22px;
      }

      .panel p {
        color: var(--muted);
        line-height: 1.55;
      }

      .session-list,
      .rule-list,
      .lane-list {
        display: grid;
        gap: 16px;
        margin-top: 16px;
      }

      .session-card,
      .rule-card,
      .lane-card {
        padding: 18px 18px 16px;
      }

      .session-top,
      .rule-top {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 16px;
      }

      .session-top strong,
      .rule-top strong {
        display: block;
        font-size: 28px;
        line-height: 1;
      }

      .meta {
        margin-top: 8px;
        color: var(--muted);
        font-size: 14px;
      }

      .badge {
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-weight: 800;
      }

      .status-broken,
      .status-blocked {
        color: var(--bad);
        background: rgba(255, 124, 150, 0.12);
      }

      .status-watch,
      .status-review {
        color: var(--warn);
        background: rgba(240, 201, 105, 0.12);
      }

      .status-healthy,
      .status-ready {
        color: var(--good);
        background: rgba(120, 215, 178, 0.12);
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-top: 16px;
      }

      .subcard {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.03);
      }

      .subcard h3 {
        margin: 0;
        font-size: 17px;
      }

      .subcard p,
      .subcard ul {
        color: var(--muted);
        line-height: 1.5;
      }

      .subcard ul {
        margin: 10px 0 0;
        padding-left: 18px;
      }

      .lane-card h3 {
        margin: 14px 0 6px;
        font-size: 26px;
      }

      .lane-meta {
        color: var(--muted);
        display: grid;
        gap: 6px;
        font-size: 14px;
      }

      .footer-note {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-top: 18px;
        color: var(--muted);
        font-size: 14px;
      }

      .footer-note strong {
        color: #dbe8ff;
      }

      @media (max-width: 1180px) {
        .metrics,
        .section-grid,
        .card-grid {
          grid-template-columns: 1fr 1fr;
        }

        .topbar {
          flex-direction: column;
          align-items: start;
        }
      }

      @media (max-width: 820px) {
        .page {
          padding: 18px 14px 34px;
        }

        .metrics,
        .section-grid,
        .card-grid {
          grid-template-columns: 1fr;
        }

        .nav {
          width: 100%;
          justify-content: start;
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="topbar">
        <div class="brand">
          <div class="brand-mark">HP</div>
          <div class="brand-copy">
            <strong>${productName}</strong>
            <span>Draft recovery + publish-safe preview flow</span>
          </div>
        </div>
        <div class="nav">${nav}</div>
      </div>

      <section class="hero">
        <p class="eyebrow">Headless CMS preview recovery</p>
        <h1>${title}</h1>
        <p class="intro">${intro}</p>

        <div class="metrics">
          <div class="metric-card">
            <h2>Preview sessions</h2>
            <strong>${current.sessionCount}</strong>
            <p>Draft and scheduled publish flows currently tracked across the headless stack.</p>
          </div>
          <div class="metric-card">
            <h2>Broken previews</h2>
            <strong>${current.brokenCount}</strong>
            <p>Sessions still rendering stale, partial, or incorrectly resolved draft state.</p>
          </div>
          <div class="metric-card">
            <h2>Watch lane</h2>
            <strong>${current.watchCount}</strong>
            <p>Flows that mostly work but still leak metadata, roles, or related content drift.</p>
          </div>
          <div class="metric-card">
            <h2>Healthy flows</h2>
            <strong>${current.healthyCount}</strong>
            <p>Preview patterns strong enough to copy into the rest of the headless stack.</p>
          </div>
          <div class="metric-card">
            <h2>Recovery score</h2>
            <strong>${current.recoveryScore}</strong>
            <p>Current preview reliability across routing, auth, cache invalidation, and publish readiness.</p>
          </div>
        </div>
      </section>

      ${content}
    </div>
  </body>
</html>`;
}

export function renderOverview() {
  const sessions = sessionBoard().slice(0, 3);
  const rules = ruleBoard().slice(0, 2);
  const current = summary();

  return shell(
    "/",
    "Repair headless preview flows before editors stop trusting the draft lane.",
    "This recovery kit keeps the biggest headless CMS preview failures visible: stale routes, broken draft assets, preview auth drift, and scheduled publish surprises.",
    `
      <section class="section-grid">
        <div class="panel">
          <h2>Lead recommendation</h2>
          <p>${current.leadRecommendation}</p>
          <div class="session-list">
            ${sessions
              .map(
                (item) => `
                  <article class="session-card">
                    <div class="session-top">
                      <div>
                        <strong>${item.slug}</strong>
                        <div class="meta">${item.owner} · ${item.cmsState} · ${item.frontendState}</div>
                      </div>
                      <span class="badge status-${item.status}">${item.status}</span>
                    </div>
                    <div class="card-grid">
                      <div class="subcard">
                        <h3>Lead break</h3>
                        <p>${item.leadBreak}</p>
                      </div>
                      <div class="subcard">
                        <h3>Next action</h3>
                        <p>${item.nextAction}</p>
                      </div>
                    </div>
                  </article>`,
              )
              .join("")}
          </div>
        </div>
        <div class="panel">
          <h2>Recovery rules</h2>
          <p>Reliable preview recovery comes from a few stable rules, not from patching every broken page one at a time.</p>
          <div class="rule-list">
            ${rules
              .map(
                (item) => `
                  <article class="rule-card">
                    <div class="rule-top">
                      <div>
                        <strong>${item.surface}</strong>
                        <div class="meta">${item.owner}</div>
                      </div>
                    </div>
                    <div class="card-grid">
                      <div class="subcard">
                        <h3>Rule</h3>
                        <p>${item.rule}</p>
                      </div>
                      <div class="subcard">
                        <h3>Failure mode</h3>
                        <p>${item.failureMode}</p>
                      </div>
                    </div>
                  </article>`,
              )
              .join("")}
          </div>
          <div class="footer-note">
            <span>Goal: <strong>make preview as trustworthy as publish</strong></span>
            <span>Editors should not need a workaround spreadsheet to know what is real.</span>
          </div>
        </div>
      </section>
    `,
  );
}

export function renderPreviewMatrix() {
  const sessions = sessionBoard();

  return shell(
    "/preview-matrix",
    "Track which draft sessions are broken, drifting, or healthy across the preview stack.",
    "The preview matrix keeps draft routing, auth, and render state visible page by page so you can repair the right surfaces first.",
    `
      <section class="panel" style="margin-top: 22px;">
        <h2>Preview recovery lane</h2>
        <div class="session-list">
          ${sessions
            .map(
              (item) => `
                <article class="session-card">
                  <div class="session-top">
                    <div>
                      <strong>${item.slug}</strong>
                      <div class="meta">${item.owner} · CMS ${item.cmsState} · frontend ${item.frontendState}</div>
                    </div>
                    <span class="badge status-${item.status}">${item.status}</span>
                  </div>
                  <div class="card-grid">
                    <div class="subcard">
                      <h3>Draft URL</h3>
                      <p>${item.draftUrl}</p>
                    </div>
                    <div class="subcard">
                      <h3>Auth state</h3>
                      <p>${item.authState}</p>
                    </div>
                    <div class="subcard">
                      <h3>Lead break</h3>
                      <p>${item.leadBreak}</p>
                    </div>
                    <div class="subcard">
                      <h3>Next action</h3>
                      <p>${item.nextAction}</p>
                    </div>
                  </div>
                </article>`,
            )
            .join("")}
        </div>
      </section>
    `,
  );
}

export function renderRecoveryRules() {
  const rules = ruleBoard();

  return shell(
    "/recovery-rules",
    "Keep the small set of rules that turn preview recovery from chaos into a stable platform pattern.",
    "Headless preview stays fragile when each team patches symptoms independently. These rules make the system repeatable.",
    `
      <section class="section-grid">
        <div class="panel">
          <h2>Rule register</h2>
          <div class="rule-list">
            ${rules
              .map(
                (item) => `
                  <article class="rule-card">
                    <div class="rule-top">
                      <div>
                        <strong>${item.surface}</strong>
                        <div class="meta">${item.owner}</div>
                      </div>
                    </div>
                    <div class="card-grid">
                      <div class="subcard">
                        <h3>Rule</h3>
                        <p>${item.rule}</p>
                      </div>
                      <div class="subcard">
                        <h3>Failure mode</h3>
                        <p>${item.failureMode}</p>
                      </div>
                    </div>
                  </article>`,
              )
              .join("")}
          </div>
        </div>
        <div class="panel">
          <h2>Why preview breaks</h2>
          <div class="card-grid">
            <article class="subcard">
              <h3>Published-first routing</h3>
              <p>Many stacks still resolve preview requests through production route maps before considering draft state.</p>
            </article>
            <article class="subcard">
              <h3>Split data loaders</h3>
              <p>Meta tags, related content, and media often fetch through different pathways, which makes previews only partially accurate.</p>
            </article>
            <article class="subcard">
              <h3>Weak preview auth</h3>
              <p>Permanent preview tokens and loose role checks make headless preview simultaneously fragile and unsafe.</p>
            </article>
            <article class="subcard">
              <h3>Publish-time drift</h3>
              <p>Scheduled pages often preview well enough visually, but fail once media, cache, or metadata dependencies are evaluated together.</p>
            </article>
          </div>
        </div>
      </section>
    `,
  );
}

export function renderPublishLane() {
  const lanes = publishBoard();

  return shell(
    "/publish-lane",
    "Connect preview recovery to the actual publish lane so broken drafts do not become launch surprises.",
    "Preview recovery matters most when it keeps scheduled releases, support updates, and campaign pushes from shipping partial state.",
    `
      <section class="panel" style="margin-top: 22px;">
        <h2>Publish readiness lanes</h2>
        <div class="lane-list">
          ${lanes
            .map(
              (item) => `
                <article class="lane-card">
                  <h2>${item.lane}</h2>
                  <h3><span class="badge status-${item.status}">${item.status}</span></h3>
                  <div class="lane-meta">
                    <span>Evidence: ${item.evidence}</span>
                    <span>Next move: ${item.nextMove}</span>
                  </div>
                </article>`,
            )
            .join("")}
        </div>
        <div class="footer-note">
          <span>Rule: <strong>if preview is not trustworthy, publish is not ready</strong></span>
          <span>Healthy preview flows should be treated like release infrastructure, not editorial convenience.</span>
        </div>
      </section>
    `,
  );
}

export function renderVerification() {
  const current = summary();

  return shell(
    "/verification",
    "See what the current preview posture proves about routing, auth, and publish safety.",
    "The verification view condenses the recovery surface into the signals that matter before the next launch or editorial push.",
    `
      <section class="section-grid">
        <div class="panel">
          <h2>Recovery proof</h2>
          <div class="card-grid">
            <article class="subcard">
              <h3>Tracked preview flows</h3>
              <p>${current.sessionCount} sessions are currently modeled across draft, support, campaign, and partner surfaces.</p>
            </article>
            <article class="subcard">
              <h3>Broken flows</h3>
              <p>${current.brokenCount} sessions still fail hard enough to erode editor confidence or publish safety.</p>
            </article>
            <article class="subcard">
              <h3>Watch flows</h3>
              <p>${current.watchCount} sessions mostly work, but still leak metadata, asset, or role-based drift.</p>
            </article>
            <article class="subcard">
              <h3>Recovery score</h3>
              <p>${current.recoveryScore} reflects a stack that is usable, but still too uneven to trust blindly under release pressure.</p>
            </article>
          </div>
        </div>
        <div class="panel">
          <h2>What to inspect next</h2>
          <p>${current.leadRecommendation}</p>
          <div class="card-grid">
            <article class="subcard">
              <h3>Route resolution</h3>
              <p>Fixing draft-first route resolution usually removes the largest class of “preview shows published content” failures.</p>
            </article>
            <article class="subcard">
              <h3>Draft-linked assets</h3>
              <p>Previews are only trustworthy when draft media, related content, and metadata travel through the same preview session.</p>
            </article>
            <article class="subcard">
              <h3>Role-safe preview auth</h3>
              <p>Preview should be specific enough to trust, but short-lived and scoped enough to stay safe.</p>
            </article>
            <article class="subcard">
              <h3>Scheduled publish preflight</h3>
              <p>Campaign and launch pages deserve a preflight pass that checks more than just visible body copy.</p>
            </article>
          </div>
        </div>
      </section>
    `,
  );
}

export function renderDocs() {
  return shell(
    "/docs",
    "Understand the routes, payloads, and preview-recovery surfaces modeled in the kit.",
    "The app ships both operator-facing HTML routes and JSON payloads for summary, preview sessions, recovery rules, and publish readiness.",
    `
      <section class="section-grid">
        <div class="panel">
          <h2>HTML routes</h2>
          <div class="card-grid">
            <article class="subcard"><h3>/</h3><p>Overview of the preview recovery estate.</p></article>
            <article class="subcard"><h3>/preview-matrix</h3><p>Preview sessions sorted by break severity.</p></article>
            <article class="subcard"><h3>/recovery-rules</h3><p>Stable preview-recovery rule register.</p></article>
            <article class="subcard"><h3>/publish-lane</h3><p>Preview-to-publish readiness surface.</p></article>
            <article class="subcard"><h3>/verification</h3><p>Current recovery proof and next inspection lane.</p></article>
            <article class="subcard"><h3>/docs</h3><p>Route and payload reference.</p></article>
          </div>
        </div>
        <div class="panel">
          <h2>JSON routes</h2>
          <div class="card-grid">
            <article class="subcard"><h3>/api/dashboard/summary</h3><p>High-level preview recovery posture.</p></article>
            <article class="subcard"><h3>/api/sessions</h3><p>Draft session matrix sorted by break pressure.</p></article>
            <article class="subcard"><h3>/api/rules</h3><p>Recovery rules and failure modes.</p></article>
            <article class="subcard"><h3>/api/publish-lanes</h3><p>Preview-connected publish readiness lanes.</p></article>
            <article class="subcard"><h3>/api/sample</h3><p>Complete preview recovery payload in one response.</p></article>
          </div>
        </div>
      </section>
    `,
  );
}
