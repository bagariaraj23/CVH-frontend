// src/app/DoctorPanel/layout.js

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
