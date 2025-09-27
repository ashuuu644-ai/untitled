"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";

export const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  useEffect(() => {
    // simple visual enhancement on mount
    const t = setTimeout(() => {}, 200);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email: form.email,
        name: form.name,
        password: form.password,
      });

      if (error?.code) {
        const map: Record<string, string> = {
          USER_ALREADY_EXISTS: "Email already registered",
          INVALID_EMAIL: "Please enter a valid email address",
          INVALID_PASSWORD: "Password does not meet requirements",
        };
        const msg = map[error.code] || error.message || "Registration failed";
        toast.error(msg);
        console.error("Registration error:", { code: error.code, message: error.message });
        return;
      }

      if (!data) {
        toast.error("Registration failed. Please try again.");
        return;
      }

      toast.success("Account created! Please log in.");
      router.push("/login?registered=true");
    } catch (err: any) {
      const message = err?.message || "Registration failed";
      toast.error(message);
      console.error("Registration exception:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-50%,var(--color-primary)/10%,transparent)]" />
      <Card className="mx-auto w-full max-w-md border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Start managing your gym in minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Alex Morgan"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input
                id="confirm"
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                autoComplete="off"
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} 
              Create account
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <a href="/login" className="text-primary underline-offset-4 hover:underline">Log in</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;