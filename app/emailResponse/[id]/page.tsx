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
          className="grid max-h-65 grid-cols-6 overflow-auto border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={Math.random() * 100000}
        >
          <div className="col-span-2 flex items-start">
            <p className="text-sm text-black dark:text-white">{r.userEmail}</p>
          </div>
          <div className="col-span-4 flex flex-col items-start ">
            <>
              <h4>
                1. Would you love to partner with KNOTOPIAN for your outsourcing
                projects?
              </h4>
              <p className="text-sm text-black dark:text-white">
                Answer: {r.response?.q1}
              </p>
              <h4>
                2. Trust us, you are missing a great deal already! Okay, would
                you give us a chance to display our portfolio?
              </h4>
              <p className="text-sm text-black dark:text-white">
                Answer: {r.response?.q2}
              </p>
              <h4>
                3. Uhm, we still don’t want to miss a chance to let you know how
                much we can help you! After all, we have a record of creating
                JAW-DROPPING eLearning in just 7 days! Would you want to know
                how flexible is Knotopian’s collaboration framework?
              </h4>
              <p className="text-sm text-black dark:text-white">
                Answer: {r.response?.q3}
              </p>
              <h4>
                4. Ouch! Give us a FEW minutes and SAVE huge! You won’t regret.
                Just letting you know our team will be available 24x7 to
                supporting your needs. Cool, let’s think of the partnership
                later. But, how about a quick sync-up to just know us better?
              </h4>
              <p className="text-sm text-black dark:text-white">
                Answer: {r.response?.q4}
              </p>
              <h4>
                5. We just WON a LearnX Gold Award for one of our innovative
                learning solutions. Just letting you know! And yeah, we still
                want to meet you. After all, we both work towards the same goal
                – Creating Impactful Learning.
              </h4>
              <p className="text-sm text-black dark:text-white">
                Answer: {r.response?.q5}
              </p>
            </>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResponseDetail;
