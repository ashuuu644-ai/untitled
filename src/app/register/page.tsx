import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="relative min-h-[calc(100vh-64px)]">
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_50%_-10%,var(--color-primary)/15%,transparent)]" />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Start managing memberships, attendance and trainer scheduling.</p>
        </div>

        <div className="mt-8 md:mt-10">
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="underline underline-offset-4">Log in</Link>.
        </p>
      </section>
    </main>
  );
}