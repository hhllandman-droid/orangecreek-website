import Link from 'next/link'

import { Logo } from '@/components/brand/Logo'

export function SiteHeader() {
  return (
    <header className="landing-header">
      <div className="landing-header-inner">
        <Link href="/" style={{ display: 'inline-flex' }}>
          <Logo size={19} />
        </Link>
        <nav className="landing-nav">
          <Link className="landing-nav-link" href="/#why">
            Waarom
          </Link>
          <Link className="landing-nav-link" href="/#aanpak">
            Aanpak
          </Link>
          <Link className="landing-nav-link" href="/#portfolio">
            Portfolio
          </Link>
          <Link className="landing-nav-link" href="/nieuws">
            Nieuws
          </Link>
          <Link className="landing-nav-cta" href="/#contact">
            Neem contact op
          </Link>
        </nav>
      </div>
    </header>
  )
}
