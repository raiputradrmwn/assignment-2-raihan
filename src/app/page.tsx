"use client";

import LoginForm from "@/components/layout/loginform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoginForm />
    </main>
  );
}
