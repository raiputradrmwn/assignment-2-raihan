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
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      Cookies.set("user", JSON.stringify(data));
      return data;
    },
  });

  const onSubmit = (data: RegisterData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success(
          "Registrasi Berhasil! Akun Anda telah terdaftar. Silakan login."
        );
        form.reset({ email: "", password: "" });
        router.push("/");
      },
      onError: () => {
        toast.error("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
      },
    });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-96 mx-auto p-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Register Page</CardTitle>
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
                Register
              </Button>
            </form>
          </Form>
          <div className="text-center mt-6 text-gray-600 text-sm sm:text-base">
            <p>
              Sudah punya akun?{" "}
              <Link href="/register" className="text-blue-600">
                Masuk sekarang
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
