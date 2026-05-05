import "./globals.css";

export const metadata = {
  title: "Our Cookbook",
  description: "Maddie & Connor's digital cookbook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
