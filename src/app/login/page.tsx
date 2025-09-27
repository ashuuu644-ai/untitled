import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative min-h-[calc(100vh-64px)]">
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_50%_-10%,var(--color-primary)/15%,transparent)]" />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Sign in to your gym</h1>
          <p className="mt-2 text-muted-foreground">Access memberships, attendance and trainer scheduling in one place.</p>
        </div>

        <div className="mt-8 md:mt-10">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          By continuing, you agree to our <Link href="#" className="underline underline-offset-4">Terms</Link> and <Link href="#" className="underline underline-offset-4">Privacy Policy</Link>.
        </p>
      </section>
    </main>
  );
}