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
      className="inline-flex items-center justify-center rounded-md bg-blue-400 px-4 py-4 text-center font-sm text-white hover:bg-opacity-90 lg:px-4xl:px-4"
      onClick={() => {
        setResponses(ures);
      }}
    >
      View Responses
    </Link>
  );
}

export default ResponseButton;
