"use client";
import { useSession } from "next-auth/react";
export function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const authenticated = status === "authenticated";

  return { session, loading, authenticated };
}
