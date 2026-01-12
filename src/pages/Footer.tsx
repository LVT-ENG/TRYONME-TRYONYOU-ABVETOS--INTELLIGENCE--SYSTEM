const Footer = () => (
  <footer>
    <p>© {new Date().getFullYear()} TryOnYou – Unified demo for Fiverr / Danish</p>
    <style jsx>{`
      footer {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding: 0.75rem 1.5rem;
        text-align: center;
        font-size: 0.8rem;
        opacity: 0.7;
      }
    `}</style>
  </footer>
);

export default Footer;
