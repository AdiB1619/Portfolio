import React from 'react';
import { Navbar } from '../components/public/Navbar';
import { Footer } from '../components/public/Footer';

export function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col selection:bg-primary/30 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
