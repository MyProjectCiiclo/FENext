import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
