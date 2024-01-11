"use client"
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { cookies } from 'next/headers'



export default function Home() {
  const router = useRouter()

  useEffect(()=> {
    router.push("/feed")
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Redirecting...
    </main>
  );
}
