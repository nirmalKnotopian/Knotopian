"use client";
import DataCard from "@/components/Cards/DataCard";
import useEmailProvider from "@/store/EmailProvider";
import React from "react";

function ResponseDetail() {
  const { responses } = useEmailProvider();
  console.log("Page Responses", responses);
  return (
    <div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">From</p>
        </div>
        <div className="col-span-4 hidden items-center sm:flex">
          <p className="font-medium">Message</p>
        </div>
      </div>
      {responses?.map((r) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={r.response}
        >
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{r.userEmail}</p>
          </div>
          <div className="col-span-4 flex items-center">
            <p className="text-sm text-black dark:text-white">{r.response}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResponseDetail;
