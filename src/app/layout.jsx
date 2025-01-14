"use client";
import { Provider } from "react-redux";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import store from "@/store";
import "./globals.css";


const toasterConfig = {
  position: "bottom-right",
  toastOptions: {
    style: {
      backgroundColor: "#127AC1",
      color: "white",
      fontFamily: "sans-serif",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "12px 16px",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
        <link rel="icon" href="/favicon.png" type="image/vnd.microsoft.icon" />
      </head>
      <body className="  font-sans">
        <Provider store={store}>
          <Navbar />
          <main className="min-h-screen flex flex-col justify-between">
            {children}
          </main>
          <Footer />
          <Toaster {...toasterConfig} />
        </Provider>
      </body>
    </html>
  );
}