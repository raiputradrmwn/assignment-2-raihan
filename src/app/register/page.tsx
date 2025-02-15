"use client";
import RegisterForm from "@/components/layout/registerform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <RegisterForm />
    </main>
  );
}
