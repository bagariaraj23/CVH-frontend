// app/layout.js

// import '../admin/styles/globals.css'; // Updated path to match your project structure
import { Header } from '../admin/components/Header'; // Updated path
import { Sidebar } from '../admin/components/Sidebar'; // Updated path
import { Footer } from '../admin/components/Footer'; // Updated path

export default function RootLayout({ children }) {
  return (
    <>
      <div className="flex h-screen text-black flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
