"use client";
import DataCard from "@/components/Cards/DataCard";
import { db } from "@/firebase";
import useEmailProvider from "@/store/EmailProvider";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ResponseDetail() {
  const { responses } = useEmailProvider();
  const [questions, setquestions] = useState<string[]>();
  const [aresponses, setaresponses] = useState<string[]>();
  console.log("Page Responses", responses);
  const getQuestions = async () => {
    try {
      if (responses.length == 0) return;
      const toastId = toast.promise(
        new Promise(async (resolve, reject) => {
          const q = await getDoc(
            doc(db, "emailquestions", "z8TggwoJcPiyqmKtw3dp"),
          );
          if (!q.exists()) throw "Add Some Questions To Database First";
          const EmailQuestions: string[] = q.data()?.questions as string[];
          setquestions(EmailQuestions);
          resolve("Success");
        }),
        {
          pending: "Fetching Responses... ",
          success: "Fetched successfully",
          error: "Failed to Fethced Data",
        },
      );
    } catch (e) {
      console.log(e);
      toast.error("Add Some Questions To Database First");
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);
  console.log(questions);
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
      {responses.length <= 0 && (
        <p className="my-10 text-center">No Replies To This Email</p>
      )}
      {responses?.map((r, responseIndex) => (
        <div
          className="grid max-h-96 grid-cols-6 overflow-auto border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={responseIndex}
        >
          <div className="col-span-2 flex items-start">
            <p className="text-sm font-medium text-black dark:text-white">
              {r.userEmail}
            </p>
          </div>
          <div className="col-span-4 flex flex-col items-start">
            {r.response &&
              questions &&
              Object.entries(r.response)
                .filter(([key]) => key !== "stillInterested")
                .map((q, index) => {
                  if (questions[q[0][1] as unknown as number]) {
                    return (
                      <div key={index} className="mb-4 w-full">
                        <h4 className="mb-1 text-lg font-semibold text-black dark:text-slate-400">
                          {questions[(q[0][1] as unknown as number) - 1]}
                        </h4>
                        <p className="text-sm text-black dark:text-white">
                          Answer:{" "}
                          <span className="font-semibold">
                            {q[1] || "No Response"}
                          </span>
                        </p>
                        <hr className="my-3 w-full" />
                      </div>
                    );
                  } else {
                    return null
                  }
                })}
            {r.response && questions && (
              <div className="mb-4">
                <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">
                  Are You Still Interested In Proceeding?
                </h4>
                <p className="text-sm text-black dark:text-white">
                  Answer:{" "}
                  <span className="font-semibold">
                    {r.response["stillInterested"]}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResponseDetail;
