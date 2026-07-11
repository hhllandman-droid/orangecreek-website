type LogoTheme = "light" | "dark" | "color";

const schemes: Record<
  LogoTheme,
  { fg: string; dot: string; rule: string; tag: string }
> = {
  light: {
    fg: "#0b1020",
    dot: "#e26a2c",
    rule: "rgba(11,16,32,.18)",
    tag: "rgba(11,16,32,.5)",
  },
  dark: {
    fg: "#ffffff",
    dot: "#e26a2c",
    rule: "rgba(255,255,255,.28)",
    tag: "rgba(255,255,255,.62)",
  },
  color: {
    fg: "#ffffff",
    dot: "#ffffff",
    rule: "rgba(255,255,255,.5)",
    tag: "rgba(255,255,255,.88)",
  },
};

type LogoProps = {
  size?: number;
  theme?: LogoTheme;
  tagline?: boolean;
};

export function Logo({ size = 22, theme = "light", tagline = false }: LogoProps) {
  const colors = schemes[theme];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.5,
        lineHeight: 1,
      }}
    >
      <span
        style={{
          width: size * 0.46,
          height: size * 0.46,
          borderRadius: "50%",
          background: colors.dot,
          flex: "none",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
          fontWeight: 600,
          fontSize: size,
          letterSpacing: "-0.035em",
          color: colors.fg,
          whiteSpace: "nowrap",
        }}
      >
        Orange Creek
      </span>
      {tagline ? (
        <>
          <span
            style={{
              width: 1,
              height: size * 0.72,
              background: colors.rule,
              flex: "none",
              marginLeft: size * 0.04,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontWeight: 500,
              fontSize: size * 0.42,
              lineHeight: 1.15,
              color: colors.tag,
              whiteSpace: "nowrap",
            }}
          >
            When life gives
            <br />
            you oranges
          </span>
        </>
      ) : null}
    </span>
  );
}
