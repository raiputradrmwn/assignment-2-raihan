"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

// Definisi tipe data untuk form login
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

type LoginData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitch: () => void; // Menambahkan tipe fungsi
}

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const user = Cookies.get("user");
      return user ? JSON.parse(user) : null;
    },
  });

  const onSubmit = (data: LoginData) => { // Menambahkan tipe data
    if (userData && userData.email === data.email && userData.password === data.password) {
      alert("Login Berhasil!");
    } else {
      alert("Login Gagal! Email atau password salah.");
    }
  };

  return (
    <Card className="w-96 mx-auto p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Form>
        <button className="text-blue-500 mt-2" onClick={onSwitch}>
          Belum punya akun? Register
        </button>
      </CardContent>
    </Card>
  );
}
