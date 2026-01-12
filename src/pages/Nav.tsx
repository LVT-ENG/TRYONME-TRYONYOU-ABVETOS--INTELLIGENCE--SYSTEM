import Link from "next/link";

const Nav = () => {
  return (
    <header>
      <nav className="nav">
        <div className="nav-left">
          <img src="/assets/logo.png" alt="TryOnYou" className="logo" />
          <span className="brand">TryOnYou</span>
        </div>
        <div className="nav-links">
          <Link href="/">Landing</Link>
          <Link href="/demo">Demo</Link>
          <Link href="/avatar">Avatar</Link>
          <Link href="/wardrobe">Wardrobe</Link>
          <Link href="/look">Look Sheet</Link>
        </div>
      </nav>
      <style jsx>{`
        header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }
        .brand {
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .nav-links {
          display: flex;
          gap: 1rem;
          font-size: 0.95rem;
        }
        a {
          color: #f5f5f5;
          text-decoration: none;
          opacity: 0.9;
        }
        a:hover {
          opacity: 1;
          text-decoration: underline;
        }
      `}</style>
    </header>
  );
};

export default Nav;
