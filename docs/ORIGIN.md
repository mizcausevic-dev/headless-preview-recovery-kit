# Why We Built This

Headless CMS teams usually discover the preview problem the hard way. The content team updates a draft, opens the preview link, and sees either the last published version, a partially updated page, missing draft media, or a route that only works if someone manually clears the cache first.

That failure hurts more than a normal bug because preview is the trust surface between editorial and engineering. Once editors stop trusting preview, they stop trusting scheduled launches, review workflows, and eventually the entire headless publishing stack.

Headless Preview Recovery Kit exists to make those failures visible and repairable. Instead of treating every broken preview link as a fresh debugging exercise, it organizes the problem into the repeatable layers that usually cause the break:

- draft route resolution
- preview authentication and role scope
- draft-linked media and metadata
- scheduled publish preflight
- cache invalidation after revision changes

The design philosophy is simple:

- operator-first, so the broken preview lane is obvious
- publish-connected, so preview quality is measured as release readiness
- system-oriented, so route, auth, cache, and asset drift are treated together
- practical, so every problem maps to a repair action instead of just a symptom

This first version focuses on:
- draft session status
- recovery rules
- publish lane posture
- verification of current reliability

The roadmap from here is practical:
- signed preview URL generation
- frontend framework adapters
- deeper scheduled publish preflight checks
- integrations with CMS revision logs and release workflows
