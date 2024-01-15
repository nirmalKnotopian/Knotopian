"use client";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
function checkAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
      } else {
        router.replace("/auth/signin");
      }
    });
    return () => subscribe();
  });

  return <div>{children}</div>;
}

export default checkAuth;
