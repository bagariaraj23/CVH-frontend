import "./globals.css";
import ErrorBoundary from './components/ErrorBoundary';
import { CustomToastContainer } from './components/ErrorNotification';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

export default function RootLayout({ children }) {
  const navItems = [
    { name: "Product", link: "/product" },
    { name: "Who we serve", link: "/who-we-serve" },
    { name: "Resources", link: "/resources" },
    { name: "Pricing", link: "/pricing" },
  ];

  return (
    <html lang="en">
      <head>
        {/* Adding favicon */}
        <link rel="icon" href="/icon.png" />
        {/* Setting page title */}
        <title>CareValue Health</title>
      </head>
      <body>
        <ErrorBoundary>
          <LoginModal />
          <RegisterModal />
          <main>{children}</main>
          <ToastContainer />
        </ErrorBoundary>
        <CustomToastContainer />
      </body>
    </html>
  );
}
