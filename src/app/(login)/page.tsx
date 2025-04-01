"use client";
import { useState } from "react";
import { loginSchema } from "@/lib/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function Login() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const submission = fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok && data.error) {
          throw new Error(data.error);
        }
        if (data.redirect) router.replace(data.redirect)
      })
      .finally(() => setLoading(false));

    toast.promise(submission, {
      loading: "Logging in",
      success: "Login successful",
      error: (err) => `Login failed: ${err.message}`,
    });
    setLoading(true);
  }
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="md:w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log in to submit a report</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
