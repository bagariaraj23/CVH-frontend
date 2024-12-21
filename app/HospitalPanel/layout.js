// src/app/HospitalPanel/layout.js

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
