import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '80px', flex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
