# Strategic Roadmap: The Launch Week

## 1. Technical Audit: Critical Changes

Based on the strategic assessment, the following technical priorities have been identified to ensure a successful launch.

### A. Elevate "Dead Letter Queue" to Critical Priority (P0)
*   **The Problem:** In a usage-based billing system, **data loss = revenue loss**. If the ingestion service crashes or Redis hiccups while processing a batch of 1,000 events, those events are gone forever.
*   **The Fix:** Implement the Dead Letter Queue (DLQ) before onboarding a single real customer. If an event fails validation or processing, it *must* go to a DLQ for manual inspection and replay.
*   **Goal:** "Zero Data Loss" architecture.

### B. The SDK is "Product," Not "Support" (P0)
*   **The Problem:** Developers do not want to write raw HTTP requests to `POST /v1/events` and handle their own batching, retries, and error backoff.
*   **The Fix:** Shift resources to the SDK immediately. It needs to handle **automatic batching** (buffer events for 500ms or 100 items) and **background flushing** so it doesn't block the user's main thread.

### C. Audit Logs for "Minimum Viable Compliance" (P2)
*   **The Problem:** If a customer claims "My bill changed," and we cannot prove *who* updated the `Burn Table` or *when* the credit grant was issued, trust is lost.
*   **The Fix:** Add an append-only audit log for every write operation on `Credits`, `BurnTables`, and `Entitlements`.

## 2. Strategic Next Steps

### Q1: Should I open the private repo to the public?
**Yes, but not quietly.**
*   **Why:** Open source is the primary distribution channel against incumbents like Stripe or Metronome. It allows developers to "audit" the code for security and try it locally.
*   **How:** Schedule a **"Launch Week"**. A repo with no stars and no activity looks dead. Open it when traffic can be driven to it.

### Q2: Should I offer SaaS right away or gather community first?
**Gather community and "Design Partners" first. Delay general SaaS.**
*   **The Trap:** Launching a public SaaS billing system requires 99.99% SLA, 24/7 support, and SOC2 compliance.
*   **The Strategy:**
    1.  **Self-Hosted First (Community):** Let people self-host. If it breaks, it's on their infrastructure. This builds community and debugs code with low liability.
    2.  **Managed "Alpha" (Design Partners):** Hand-pick 3–5 startups (likely other AI wrappers) to use a hosted version. Do not charge them a SaaS fee yet; their "payment" is feedback and patience.

## 3. The Launch Week Strategy

Dedicate one week to release something new every day to maximize noise.

**Preparation Phase (Weeks 1-3)**
*   **Finish Critical Tech:** DLQ, SDK (Batching), and basic Audit Logs.
*   **Documentation:** Write a "Get Started in 5 Minutes" guide.
*   **The Narrative:** We are not building "Billing." We are building **"The Revenue OS for Agentic AI."**

**The Launch Week (Week 4)**
*   **Monday: The Manifesto & Open Source.**
    *   Blog: "Why we are open sourcing billing for the Agentic Era."
    *   Action: Make repo public. Post to Hacker News.
*   **Tuesday: The Architecture.**
    *   Blog: "How we handle millions of events with Postgres & Redis (and why we don't use Stripe for metering)."
    *   Content: Deep dive into Ingestion Service and Idempotency.
*   **Wednesday: The SDK & DX.**
    *   Blog: "One line of code to monetize your AI Agent."
    *   Release: The TypeScript SDK. Show a demo of it working in a Next.js app.
*   **Thursday: The "Burn Table" Feature.**
    *   Blog: "Stop pricing by token. Start pricing by outcome."
    *   Demo: Show how to configure a "Research Agent" price that abstracts token costs.
*   **Friday: The Roadmap & Design Partner Call.**
    *   Blog: "What's next? Join our private cloud beta."
    *   Call to Action: "We are accepting 5 companies for our managed cloud."

## 4. Immediate To-Do List

| Priority | Task | Reason |
| :--- | :--- | :--- |
| **P0** | **Implement Dead Letter Queue (DLQ)** | Prevent data loss during launch spikes. |
| **P0** | **Finish SDK (Batching/Retries)** | "Launch Week" needs a good SDK to be successful. |
| **P1** | **Write "The Manifesto"** | Define *why* we exist. |
| **P1** | **Design Partner Outreach** | Find 3 AI Wrapper founders. Ask them to try the self-hosted version. |
| **P2** | **Audit Logging** | "Minimum Viable Compliance" for serious users. |
