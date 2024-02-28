"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import useEmailProvider from "@/store/EmailProvider";
function ResponseButton({ ures, eid }: { ures: UserResponse[]; eid: string }) {
  const router = useRouter();
  const { setResponses } = useEmailProvider();
  return (
    <Link
      href={`/emailResponse/${eid}`}
      className="font-sm text-md inline-flex items-center justify-center rounded-md bg-blue-400 p-2 px-1 py-1 text-center text-white hover:bg-opacity-90 lg:px-6"
      onClick={() => {
        setResponses(ures);
      }}
      prefetch={false}
    >
      View Responses
    </Link>
  );
}

export default ResponseButton;
