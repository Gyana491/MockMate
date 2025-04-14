"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavigationLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");
  const isDashboardPage = pathname?.startsWith("/dashboard");
  const hideNavFooter = isAuthPage || isDashboardPage;

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main className={`${hideNavFooter ? "" : "pt-16"}`}>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
}
