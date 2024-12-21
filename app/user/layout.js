import "../globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { StickyCTA } from "../components/StickyCTA";

export default function RootLayout({ children }) {
  const navItems = [
    { name: "Product", link: "/product" },
    { name: "Who we serve", link: "/who-we-serve" },
    { name: "Resources", link: "/resources" },
    { name: "Pricing", link: "/pricing" },
  ];

  return (
    <html lang="en">
      <body>
        <Header navItems={navItems} />
        <main>{children}</main>
        <StickyCTA/>
        <Footer /> {/* Add Footer here */}
      </body>
    </html>
  );
}
