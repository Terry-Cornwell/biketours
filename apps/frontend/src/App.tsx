import { useMemo } from "react";
import type { TripFeedItem } from "@biketours/shared/types";

const demoFeed: TripFeedItem[] = [
  {
    tripId: "nordic-ride",
    stageId: "day-1",
    title: "Oslo to Drammen",
    summary: "Fjord views, coffee stops, and a riverside finish.",
    coverImage: "/images/demo/oslo-drammen.jpg",
    ownerDisplayName: "Ane",
    createdAt: new Date().toISOString(),
  },
  {
    tripId: "alps-loop",
    stageId: "day-3",
    title: "Stelvio Pass Climb",
    summary: "48 switchbacks, endless cheering, and gelato at the top.",
    coverImage: "/images/demo/stelvio.jpg",
    ownerDisplayName: "Marco",
    createdAt: new Date().toISOString(),
  },
];

export function App() {
  const feed = useMemo(() => demoFeed, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <p style={{ color: "#0d9488", fontWeight: 700, letterSpacing: "0.06em" }}>Biketours</p>
        <h1 style={{ margin: "0.35rem 0" }}>Ride stories, mapped.</h1>
        <p style={{ maxWidth: 640, color: "#334155" }}>
          Draft SPA shell wired for TanStack Query and shared domain types. Replace the demo feed with API-backed data once
          Azure Functions endpoints are ready.
        </p>
      </header>

      <section style={{ display: "grid", gap: "1rem" }}>
        {feed.map((item) => (
          <article
            key={`${item.tripId}-${item.stageId ?? "trip"}`}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
            }}
          >
            {item.coverImage && (
              <div style={{ height: 180, background: `url(${item.coverImage}) center/cover`, filter: "saturate(1.05)" }}></div>
            )}
            <div style={{ padding: "1rem" }}>
              <p style={{ textTransform: "uppercase", fontSize: 12, letterSpacing: "0.08em", color: "#64748b" }}>
                {item.ownerDisplayName}
              </p>
              <h2 style={{ margin: "0.35rem 0" }}>{item.title}</h2>
              <p style={{ color: "#475569", margin: "0.25rem 0 0.75rem" }}>{item.summary}</p>
              <p style={{ fontSize: 12, color: "#94a3b8" }}>
                Updated {new Date(item.createdAt).toLocaleDateString()} • {(item.stageId && "Stage") || "Trip"} feed
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
