import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import NavigationLayout from "@/components/NavigationLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Mock Interview",
  description: "Practice interviews with AI and get personalized feedback",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <NavigationLayout>{children}</NavigationLayout>
      </body>
    </html>
  );
}
