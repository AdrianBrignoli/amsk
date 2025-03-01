"use client";

import Footer from "../components/shared/base-elements/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
