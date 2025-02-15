"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/"); 
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("user");
    router.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-96 p-6 shadow-lg text-center">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Selamat datang, <span className="font-semibold">{user.email}</span>!</p>
          <Button className="mt-4" onClick={handleLogout}>Logout</Button>
        </CardContent>
      </Card>
    </main>
  );
}
