console.log(
  JSON.stringify(
    {
      product: "Headless Preview Recovery Kit",
      purpose:
        "TypeScript control plane for recovering reliable preview flows, draft routing, and publish validation across headless CMS frontends.",
      routes: ["/", "/preview-matrix", "/recovery-rules", "/publish-lane", "/verification", "/docs"],
      priorities: [
        "Repair stale route and draft-first fetch failures",
        "Make preview auth and role scope trustworthy",
        "Connect preview health to publish readiness",
        "Protect editors from stale or partial draft renders",
      ],
    },
    null,
    2,
  ),
);
