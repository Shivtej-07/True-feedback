import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Navbar />
      <div className="flex-grow flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}


