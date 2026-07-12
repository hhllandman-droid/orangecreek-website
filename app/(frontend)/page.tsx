import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import OrangeCreekPortfolio from "@/components/landing/OrangeCreekPortfolio";
import "@/styles/landing.css";

const stats = [
  { value: "5", label: "Deelnemingen" },
  { value: "8 jr", label: "Gem. holdperiode" },
  { value: "€22M", label: "NAV (Net asset value)" },
  { value: "8,5×", label: "Gem. multiple" },
];

const whyItems = [
  {
    title: "Waardeketen boven sectoren",
    copy: "We investeren in bedrijven die naadloos aansluiten bij onze waardeketen — elke nieuwe schakel versterkt en versnelt de rest. Geen vaste sectoren, wel kansen met exponentieel groeipotentieel die bijdragen aan een betere wereld.",
  },
  {
    title: "Hands-on, met skin in the game",
    copy: "We duiken diep in onze deelnemingen: actief sturen, cashflows optimaliseren en lange-termijn strategieën inrichten op duurzame, exponentiële groei. Ondernemers met ervaring en visie — geen afstandelijke beheerders.",
  },
  {
    title: "Geld is het middel, impact het doel",
    copy: "Door kapitaal slim in te zetten creëren we fundamentele waarde — waarde die zich vertaalt in sterke rendementen als natuurlijk gevolg van wat we opbouwen. Blijvende, positieve impact die generaties overstijgt.",
  },
];

const approachCards = [
  {
    icon: "/assets/iso/kapitaal.svg",
    title: "Kapitaal",
    copy: "Slim ingezet kapitaal, afgestemd op de fase van het bedrijf. Geduldig geld dat fundamentele waarde bouwt — geen kwartaal-denken.",
  },
  {
    icon: "/assets/iso/groei.svg",
    title: "Kennis & tools",
    copy: "Hands-on ondersteuning: strategie, cashflow-optimalisatie en operationele slagkracht, zodat potentieel volledig ontketend wordt.",
  },
  {
    icon: "/assets/iso/portfolio.svg",
    title: "Ecosysteem",
    copy: "Een netwerk waarin elke schakel de rest versterkt: bedrijven excelleren, innovaties bloeien en ambities groeien tot realiteit.",
  },
];

export default function Home() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header-inner">
          <Logo size={19} />
          <nav className="landing-nav">
            <a className="landing-nav-link" href="#why">
              Waarom
            </a>
            <a className="landing-nav-link" href="#aanpak">
              Aanpak
            </a>
            <a className="landing-nav-link" href="#portfolio">
              Portfolio
            </a>
            <a className="landing-nav-cta" href="#contact">
              Neem contact op
            </a>
          </nav>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-glow-orange" />
        <div className="landing-hero-glow-blue" />
        <div className="landing-section-inner landing-hero-inner">
          <div className="landing-eyebrow landing-hero-eyebrow">
            <span className="oc-dot" />
            Participatiemaatschappij · van ondernemers, voor ondernemers
          </div>
          <h1 className="landing-hero-title">
            When life gives you oranges,{" "}
            <span className="landing-hero-gradient-text">
              we make lemonade.
            </span>
          </h1>
          <p className="landing-hero-copy">
            We strippen complexiteit tot de kern en bouwen vandaaruit bedrijven
            met exponentieel groeipotentieel. Geen afstandelijke beheerders —
            ondernemers met visie en skin in the game.
          </p>
          <div className="landing-hero-actions">
            <a className="landing-btn-primary" href="#contact">
              Neem contact op
            </a>
            <a className="landing-btn-secondary" href="#why">
              Lees onze why
            </a>
          </div>
        </div>
      </section>

      <section className="landing-stats">
        <div className="landing-section-inner landing-stats-grid">
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <span className="landing-stat-value">{stat.value}</span>
              <span className="landing-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="why" className="landing-section">
        <div className="landing-section-inner landing-section-padded">
          <div className="landing-why-grid">
            <div className="landing-why-sidebar">
              <span className="landing-label">Start with why</span>
              <h2 className="landing-heading">
                Echte waarde ontstaat vanuit first principles.
              </h2>
              <p className="landing-body">
                We strippen complexiteit tot de kern, begrijpen wat écht drijft
                en bouwen vandaaruit een eenvoudige, krachtige
                waardepropositie.
              </p>
            </div>
            <div>
              {whyItems.map((item, index) => (
                <div key={item.title} className="landing-why-item">
                  <span className="landing-why-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <h3 className="landing-why-title">{item.title}</h3>
                    <p className="landing-why-copy">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="aanpak" className="landing-aanpak">
        <div className="landing-section-inner landing-section-padded">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 56,
              maxWidth: 640,
            }}
          >
            <span className="landing-label">Aanpak</span>
            <h2 className="landing-heading">
              Elke deelneming krijgt wat bij haar fase past.
            </h2>
          </div>
          <div className="landing-cards-grid">
            {approachCards.map((card) => (
              <div key={card.title} className="landing-card">
                <Image src={card.icon} alt="" width={72} height={72} />
                <h3 className="landing-card-title">{card.title}</h3>
                <p className="landing-card-copy">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrangeCreekPortfolio />

      <section id="contact" className="landing-contact">
        <div className="landing-contact-glow" />
        <div className="landing-section-inner landing-contact-inner">
          <span className="landing-eyebrow landing-contact-eyebrow">
            Contact
          </span>
          <h2 className="landing-contact-title">
            Samen iets groots en moois neerzetten?
          </h2>
          <p className="landing-contact-copy">
            Ondernemer, mede-investeerder of partner — obstakels zijn slechts
            kansen voor de overwinnaar. We horen graag van je.
          </p>
          <a className="landing-btn-primary" href="mailto:info@orangecreek.co">
            info@orangecreek.co
          </a>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <Logo size={16} theme="dark" tagline />
          <span className="landing-footer-copy">
            © 2026 Orange Creek · orangecreek.co
          </span>
        </div>
      </footer>
    </div>
  );
}
