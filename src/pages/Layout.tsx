import React from "react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ title, children }) => {
  const pageTitle = title ? `${title} – TryOnYou` : "TryOnYou – Demo";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="TryOnYou – Demo unificada: landing, avatar, smart wardrobe et holo try-on."
        />
      </Head>
      <div className="app-root">
        <Nav />
        <main>{children}</main>
        <Footer />
        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
              sans-serif;
            background: #050512;
            color: #f5f5f5;
          }
          .app-root {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          main {
            flex: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem;
          }
        `}</style>
      </div>
    </>
  );
};

export default Layout;
