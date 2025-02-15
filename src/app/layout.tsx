"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { queryClient } from "@/lib/queryClient";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
      </body>
    </html>
  );
}