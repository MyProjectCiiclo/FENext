import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" trancy-version="7.8.6" className="mdl-js">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
