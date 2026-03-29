"use client";

import nextDynamic from "next/dynamic";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const dynamic = "force-dynamic";

const Auth = nextDynamic(
  () =>
    Promise.all([
      import("@supabase/auth-ui-react"),
      import("@/lib/supabaseClient"),
    ]).then(([{ Auth: AuthComponent }, { supabase }]) => {
      const WrappedAuth = () => (
        <AuthComponent
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      );
      WrappedAuth.displayName = "WrappedAuth";
      return WrappedAuth;
    }),
  { ssr: false }
);

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sign in to TradeAssist
        </h1>
        <Auth />
      </div>
    </div>
  );
}
