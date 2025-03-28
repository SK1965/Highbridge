'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Use useEffect to redirect after the first render
  useEffect(() => {
    router.replace("/sign-in");
  }, [router]); // Only run once after the component is mounted

  return null; // No UI needed, just a redirect
}
