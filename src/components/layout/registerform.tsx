"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

// Definisi tipe data untuk form register
const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

type RegisterData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitch: () => void; // Menambahkan tipe fungsi
}

export default function RegisterForm({ onSwitch }: RegisterFormProps) {
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => { // Menambahkan tipe data
      Cookies.set("user", JSON.stringify(data));
      return data;
    },
  });

  const onSubmit = (data: RegisterData) => { // Menambahkan tipe data
    registerMutation.mutate(data, {
      onSuccess: () => {
        alert("Registrasi Berhasil!");
        onSwitch();
      },
    });
  };

  return (
    <Card className="w-96 mx-auto p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Register</CardTitle>
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

            <Button type="submit" className="w-full">Register</Button>
          </form>
        </Form>
        <button className="text-blue-500 mt-2" onClick={onSwitch}>
          Sudah punya akun? Login
        </button>
      </CardContent>
    </Card>
  );
}
