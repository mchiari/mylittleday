"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Home() {
  const router = useRouter();



  useEffect(() => {
    router.push("/feed");
  }, []);

  return (

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Redirecting...
      </main>

  );
}
