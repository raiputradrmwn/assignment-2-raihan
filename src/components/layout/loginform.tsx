"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Definisi tipe data untuk form login
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const Router = useRouter();
  
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const user = Cookies.get("user");
      return user ? JSON.parse(user) : null;
    },
  });

  const onSubmit = (data: LoginData) => {
    if (
      userData &&
      userData.email === data.email &&
      userData.password === data.password
    ) {
      toast.success("Login Berhasil! Anda telah berhasil masuk.");
      Router.push("/dashboard");
    } else {
      toast.error("Login Gagal! Email atau password salah.");
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-96 mx-auto p-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Login Page</CardTitle>
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
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <div className="text-center mt-6 text-gray-600 text-sm sm:text-base">
            <p>
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
