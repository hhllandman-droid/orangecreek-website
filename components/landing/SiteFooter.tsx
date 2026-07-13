import { Logo } from '@/components/brand/Logo'

export function SiteFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-inner">
        <Logo size={16} theme="dark" tagline />
        <span className="landing-footer-copy">
          © 2026 Orange Creek · orangecreek.co
        </span>
      </div>
    </footer>
  )
}
