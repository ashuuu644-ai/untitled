"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, LogIn } from "lucide-react";

export const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", rememberMe: true });

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/members");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const registered = params.get("registered");
    if (registered) {
      toast.success("Account created! Please log in.");
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
        callbackURL: "/members",
      });

      if (error?.code) {
        toast.error("Invalid email or password. Please make sure you have already registered and verified.");
        return;
      }

      toast.success("Welcome back!");
      router.push("/members");
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-50%,var(--color-primary)/10%,transparent)]" />
      <Card className="mx-auto w-full max-w-md border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Log in to access your gym dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="off"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={form.rememberMe}
                  onCheckedChange={(v) => setForm({ ...form, rememberMe: Boolean(v) })}
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</Label>
              </div>
              <button type="button" className="text-sm text-muted-foreground cursor-not-allowed" title="Coming soon">Forgot?</button>
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />} 
              Log in
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account? <a href="/register" className="text-primary underline-offset-4 hover:underline">Create one</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};