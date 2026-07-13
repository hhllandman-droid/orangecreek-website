"use client";

import { useEffect, useReducer, useState, type CSSProperties } from "react";

export type PortfolioCompanyItem = {
  name: string;
  domain: string;
  since: string;
  groei: string;
  marge: string;
  multiple: string;
};

type OrangeCreekPortfolioProps = {
  companies?: PortfolioCompanyItem[];
  edges?: [number, number][];
  nodePositions?: { x: number; y: number }[];
  title?: string;
  disclaimer?: string;
};

const T = {
  ink: "#0b1020",
  orange: "#e26a2c",
  blue: "#1b6fe0",
  green: "#10b981",
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const DEFAULT_COMPANIES: PortfolioCompanyItem[] = [
  { name: "Deelneming A", domain: "SaaS · workflow", since: "2019", groei: "+38%", marge: "24%", multiple: "2,8×" },
  { name: "Deelneming B", domain: "Logistiek · platform", since: "2020", groei: "+22%", marge: "18%", multiple: "2,1×" },
  { name: "Deelneming C", domain: "Energie · data", since: "2021", groei: "+51%", marge: "12%", multiple: "1,9×" },
  { name: "Deelneming D", domain: "Fintech · B2B", since: "2018", groei: "+17%", marge: "31%", multiple: "3,4×" },
  { name: "Deelneming E", domain: "Circulair · productie", since: "2022", groei: "+29%", marge: "15%", multiple: "1,6×" },
  { name: "Deelneming F", domain: "Health · software", since: "2023", groei: "+44%", marge: "9%", multiple: "1,3×" },
  { name: "Deelneming G", domain: "Agri · sensoren", since: "2020", groei: "+19%", marge: "21%", multiple: "2,2×" },
  { name: "Deelneming H", domain: "Retail · data", since: "2021", groei: "+26%", marge: "16%", multiple: "1,8×" },
];

const NODE_POS = [
  { x: 35, y: 16 }, { x: 58, y: 10 }, { x: 84, y: 28 }, { x: 50, y: 38 },
  { x: 30, y: 56 }, { x: 70, y: 54 }, { x: 44, y: 80 }, { x: 80, y: 78 },
];
const DEFAULT_EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 3], [3, 4], [3, 5], [2, 5], [4, 6], [5, 6], [5, 7], [6, 7],
];

const KEYFRAMES = `
@keyframes oc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes oc-flow { to { stroke-dashoffset: -24; } }
@keyframes oc-twinkle { 0%, 100% { opacity: .9; } 50% { opacity: .3; } }
.oc-marquee-row:hover { animation-play-state: paused !important; }
`;

const STAR_LAYER_1 =
  "radial-gradient(1px 1px at 8% 22%, rgba(255,255,255,.7) 50%, transparent 51%), radial-gradient(1px 1px at 24% 74%, rgba(255,255,255,.5) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 38% 14%, rgba(255,255,255,.6) 50%, transparent 51%), radial-gradient(1px 1px at 52% 62%, rgba(255,255,255,.45) 50%, transparent 51%), radial-gradient(1px 1px at 64% 88%, rgba(255,255,255,.55) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 78% 18%, rgba(255,255,255,.65) 50%, transparent 51%), radial-gradient(1px 1px at 92% 52%, rgba(255,255,255,.5) 50%, transparent 51%), radial-gradient(1px 1px at 46% 34%, rgba(255,255,255,.4) 50%, transparent 51%), radial-gradient(1px 1px at 16% 46%, rgba(255,255,255,.45) 50%, transparent 51%), radial-gradient(1px 1px at 84% 72%, rgba(255,255,255,.4) 50%, transparent 51%)";
const STAR_LAYER_2 =
  "radial-gradient(1px 1px at 12% 88%, rgba(255,255,255,.5) 50%, transparent 51%), radial-gradient(1px 1px at 30% 40%, rgba(255,255,255,.4) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 58% 8%, rgba(255,255,255,.55) 50%, transparent 51%), radial-gradient(1px 1px at 70% 42%, rgba(255,255,255,.4) 50%, transparent 51%), radial-gradient(1px 1px at 94% 90%, rgba(255,255,255,.5) 50%, transparent 51%), radial-gradient(1px 1px at 4% 60%, rgba(255,255,255,.35) 50%, transparent 51%), radial-gradient(1px 1px at 44% 94%, rgba(255,255,255,.4) 50%, transparent 51%)";

function useDriftClock(enabled: boolean) {
  const [, force] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    const tick = () => {
      force();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);
  return performance.now() / 1000;
}

function useKeyframes() {
  useEffect(() => {
    if (document.getElementById("oc-portfolio-kf")) return;
    const el = document.createElement("style");
    el.id = "oc-portfolio-kf";
    el.textContent = KEYFRAMES;
    document.head.appendChild(el);
  }, []);
}

const monoLabel = (extra: CSSProperties = {}) => ({
  fontFamily: T.mono,
  fontSize: 10.5,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,.45)",
  ...extra,
});

function Kpi({
  value,
  label,
  color,
  border = true,
}: {
  value: string;
  label: string;
  color: string;
  border?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        borderLeft: border ? "1px solid rgba(255,255,255,.12)" : "none",
        paddingLeft: border ? 24 : 0,
      }}
    >
      <span style={{ fontFamily: T.display, fontWeight: 600, fontSize: 26, color }}>
        {value}
      </span>
      <span style={monoLabel({ fontSize: 10 })}>{label}</span>
    </div>
  );
}

function TickerChip({
  company,
  active,
  onEnter,
}: {
  company: PortfolioCompanyItem;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 24px",
        border: `1px solid ${active ? T.orange : "rgba(255,255,255,.14)"}`,
        borderRadius: 14,
        background: active ? "rgba(226,106,44,.14)" : "rgba(255,255,255,.03)",
        cursor: "default",
        transition: "border-color .15s ease, background .15s ease",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: T.orange,
          flex: "none",
        }}
      />
      <span
        style={{
          fontFamily: T.display,
          fontWeight: 600,
          fontSize: 19,
          color: "#fff",
          whiteSpace: "nowrap",
        }}
      >
        {company.name}
      </span>
      <span
        style={monoLabel({
          fontSize: 10.5,
          letterSpacing: "0.16em",
          whiteSpace: "nowrap",
        })}
      >
        {company.domain}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  indexOffset,
  active,
  setActive,
  duration,
  reverse,
}: {
  items: PortfolioCompanyItem[];
  indexOffset: number;
  active: number;
  setActive: (index: number) => void;
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        className="oc-marquee-row"
        style={{
          display: "flex",
          gap: 14,
          width: "max-content",
          paddingLeft: 32,
          animation: `oc-marquee ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {doubled.map((company, i) => {
          const idx = indexOffset + (i % items.length);
          return (
            <TickerChip
              key={i}
              company={company}
              active={active === idx}
              onEnter={() => setActive(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function OrangeCreekPortfolio({
  companies: companiesProp,
  edges: edgesProp,
  nodePositions: nodePositionsProp,
  title = "8 bedrijven, één waardeketen.",
  disclaimer = "Namen en cijfers zijn placeholders tot publicatie is afgestemd met de deelnemingen.",
}: OrangeCreekPortfolioProps) {
  const companies =
    companiesProp && companiesProp.length > 0 ? companiesProp : DEFAULT_COMPANIES;
  const edges =
    edgesProp && edgesProp.length > 0 ? edgesProp : DEFAULT_EDGES;
  const baseNodePositions =
    nodePositionsProp && nodePositionsProp.length > 0
      ? nodePositionsProp
      : NODE_POS;
  useKeyframes();
  const [view, setView] = useState<"ticker" | "keten">("ticker");
  const [active, setActive] = useState(0);
  const activeCompany = companies[active] ?? companies[0];

  const half = Math.ceil(companies.length / 2);
  const rowA = companies.slice(0, half);
  const rowB = companies.slice(half);

  const t = useDriftClock(view === "keten");
  const pos = baseNodePositions.map((p, i) => ({
    x: p.x + Math.sin(t * (0.5 + (i % 3) * 0.15) + i * 1.7) * 1.2,
    y: p.y + Math.cos(t * (0.4 + (i % 4) * 0.12) + i * 2.3) * 1.8,
  }));

  const curve = (a: number, b: number) => {
    const mx = (pos[a].x + pos[b].x) / 2;
    const my = (pos[a].y + pos[b].y) / 2 - 6;
    return `M ${pos[a].x} ${pos[a].y} Q ${mx} ${my} ${pos[b].x} ${pos[b].y}`;
  };
  const trio = [T.orange, T.blue, T.green];

  const tabStyle = (on: boolean): CSSProperties => ({
    border: "none",
    cursor: "pointer",
    padding: "9px 18px",
    borderRadius: 999,
    fontFamily: T.mono,
    fontSize: 10.5,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    background: on ? T.orange : "transparent",
    color: on ? "#fff" : "rgba(255,255,255,.55)",
    transition: "background .15s ease, color .15s ease",
  });

  return (
    <section
      id="portfolio"
      style={{
        background:
          view === "keten"
            ? "radial-gradient(ellipse 120% 90% at 58% 42%, #131a33 0%, #0b1020 55%, #0b1020 100%)"
            : T.ink,
        position: "relative",
        overflow: "hidden",
        fontFamily: T.body,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -100,
          width: 440,
          height: 440,
          borderRadius: "50%",
          background: T.orange,
          opacity: view === "keten" ? 0.22 : 0.18,
          filter: "blur(120px)",
        }}
      />

      {view === "keten" ? (
        <>
          <div
            style={{
              position: "absolute",
              top: "18%",
              right: "-8%",
              width: 560,
              height: 560,
              borderRadius: "50%",
              background: T.orange,
              opacity: 0.14,
              filter: "blur(130px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-12%",
              left: "-6%",
              width: 620,
              height: 620,
              borderRadius: "50%",
              background: T.blue,
              opacity: 0.16,
              filter: "blur(140px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: STAR_LAYER_1,
              animation: "oc-twinkle 5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: STAR_LAYER_2,
              animation: "oc-twinkle 7s ease-in-out infinite reverse",
              pointerEvents: "none",
            }}
          />
        </>
      ) : null}

      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "104px 32px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxWidth: 640,
            }}
          >
            <span
              style={monoLabel({
                fontSize: 11.5,
                letterSpacing: "0.22em",
                color: T.orange,
              })}
            >
              Portfolio
            </span>
            <h2
              style={{
                fontFamily: T.display,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                fontSize: 44,
                lineHeight: 1.08,
                color: "#fff",
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: 999,
              background: "rgba(255,255,255,.04)",
            }}
          >
            <button type="button" onClick={() => setView("ticker")} style={tabStyle(view === "ticker")}>
              Bedrijven
            </button>
            <button type="button" onClick={() => setView("keten")} style={tabStyle(view === "keten")}>
              Waardeketen
            </button>
          </div>
        </div>
      </div>

        {view === "ticker" ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <MarqueeRow
                items={rowA}
                indexOffset={0}
                active={active}
                setActive={setActive}
                duration={40}
              />
              <MarqueeRow
                items={rowB}
                indexOffset={half}
                active={active}
                setActive={setActive}
                duration={52}
                reverse
              />
            </div>
            <div
              style={{
                position: "relative",
                maxWidth: 1180,
                margin: "0 auto",
                padding: "44px 32px 96px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                  gap: 24,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span
                    style={{
                      fontFamily: T.display,
                      fontWeight: 600,
                      fontSize: 26,
                      letterSpacing: "-0.02em",
                      color: "#fff",
                    }}
                  >
                    {activeCompany.name}
                  </span>
                  <span style={monoLabel()}>
                    {activeCompany.domain} · sinds {activeCompany.since}
                  </span>
                </div>
                <Kpi value={activeCompany.groei} label="Omzetgroei YoY" color={T.orange} />
                <Kpi value={activeCompany.marge} label="EBITDA-marge" color={T.green} />
                <Kpi value={activeCompany.multiple} label="Multiple" color={T.blue} />
              </div>
              {disclaimer ? (
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", margin: "40px 0 0" }}>
                  {disclaimer}
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <div
            style={{
              position: "relative",
              width: "100%",
              minHeight: "clamp(560px, 62vh, 760px)",
            }}
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              {edges.map(([a, b], i) => {
                const hot = active === a || active === b;
                return (
                  <path
                    key={i}
                    d={curve(a, b)}
                    fill="none"
                    stroke={hot ? T.orange : "rgba(255,255,255,.14)"}
                    strokeWidth={hot ? 1.6 : 1}
                    strokeDasharray={hot ? "6 6" : "none"}
                    vectorEffect="non-scaling-stroke"
                    style={
                      hot
                        ? {
                            transition: "stroke .15s ease",
                            animation: "oc-flow 1.2s linear infinite",
                          }
                        : { transition: "stroke .15s ease" }
                    }
                  />
                );
              })}
            </svg>
            {companies.slice(0, baseNodePositions.length).map((company, i) => {
              const on = active === i;
              const dot = on ? T.orange : trio[i % 3];
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    position: "absolute",
                    left: `${pos[i].x}%`,
                    top: `${pos[i].y}%`,
                    transform: `translate(-50%,-50%) scale(${on ? 1.08 : 1})`,
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "10px 16px",
                    border: `1px solid ${on ? T.orange : "rgba(255,255,255,.16)"}`,
                    borderRadius: 999,
                    backdropFilter: "blur(4px)",
                    background: on ? "rgba(226,106,44,.18)" : "rgba(11,16,32,.85)",
                    boxShadow: on
                      ? "0 0 34px rgba(226,106,44,.45)"
                      : "0 0 18px rgba(11,16,32,.6)",
                    cursor: "default",
                    zIndex: 2,
                    transition:
                      "border-color .15s ease, background .15s ease, box-shadow .15s ease",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: dot,
                      boxShadow: `0 0 10px ${dot}`,
                      flex: "none",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: T.display,
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {company.name}
                  </span>
                </div>
              );
            })}
            <div
              style={{
                position: "absolute",
                inset: 0,
                maxWidth: 1180,
                margin: "0 auto",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 32,
                  bottom: 24,
                  fontFamily: T.mono,
                  fontSize: 9.5,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.3)",
                  zIndex: 2,
                }}
              >
                Het Orange Creek universum
              </span>

              <div
                style={{
                  position: "relative",
                  zIndex: 3,
                  width: "min(340px, calc(100% - 64px))",
                  marginLeft: 32,
                  padding: "8px 0 56px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  minHeight: "clamp(560px, 62vh, 760px)",
                }}
              >
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,.6)",
                  margin: 0,
                  pointerEvents: "auto",
                  textShadow: "0 1px 12px rgba(11,16,32,.8)",
                }}
              >
                Geen losse deelnemingen, maar één keten waarin elke schakel de rest versterkt.
                Beweeg over een bedrijf om zijn verbindingen en cijfers te zien.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  borderRadius: 14,
                  padding: "22px 24px",
                  background: "rgba(11,16,32,.55)",
                  backdropFilter: "blur(16px)",
                  pointerEvents: "auto",
                }}
              >
                <span
                  style={{
                    fontFamily: T.display,
                    fontWeight: 600,
                    fontSize: 24,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                  }}
                >
                  {activeCompany.name}
                </span>
                <span style={monoLabel()}>
                  {activeCompany.domain} · sinds {activeCompany.since}
                </span>
                <div style={{ display: "flex", gap: 22, marginTop: 14 }}>
                  {(
                    [
                      ["groei", "Groei", T.orange],
                      ["marge", "Marge", T.green],
                      ["multiple", "Multiple", T.blue],
                    ] as const
                  ).map(([key, label, color]) => (
                    <div key={key} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span
                        style={{
                          fontFamily: T.display,
                          fontWeight: 600,
                          fontSize: 20,
                          color,
                        }}
                      >
                        {activeCompany[key]}
                      </span>
                      <span
                        style={monoLabel({ fontSize: 9.5, letterSpacing: "0.16em" })}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: "auto",
                  pointerEvents: "auto",
                  ...monoLabel({ fontSize: 10, color: "rgba(255,255,255,.4)" }),
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: T.orange,
                    flex: "none",
                  }}
                />
                Kapitaal &amp; kennis stromen door de keten
              </div>
            </div>
            </div>
          </div>
        )}

      {view === "keten" && disclaimer ? (
        <div
          style={{
            position: "relative",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 32px 96px",
          }}
        >
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", margin: "40px 0 0" }}>
            {disclaimer}
          </p>
        </div>
      ) : null}
    </section>
  );
}
