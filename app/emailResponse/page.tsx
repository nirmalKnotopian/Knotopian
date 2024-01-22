import React from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import ResponseButton from "@/components/showResponseButton/ResponseButton";
const getEmails = async () => {
  try {
    const emails = await getDocs(query(collection(db, "emails")));
    const emailResponseList: EmailResponseList = [];
    emails.forEach((e) => {
      console.log(e.data(), "next");
      emailResponseList.push({ ...(e.data() as EmailResponse) });
    });
    return emailResponseList;
  } catch (e) {
    console.log(e);
  }
};
export default async function EmailResponse() {
  const emailResponses = await getEmails();
  console.log(emailResponses);
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Email Responses
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Email Id</p>
          </div>
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="font-medium">Subject</p>
          </div>
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="font-medium">Text</p>
          </div>
        </div>
      </div>
      {emailResponses?.map((e) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={e.emailId}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">{e.emailId}</p>
            </div>
          </div>
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{e.subject}</p>
          </div>
          <div className="col-span-1 flex items-center text-ellipsis">
            <p className="text-sm text-black dark:text-white">{e.text}</p>
          </div>
          <div className="col-span-2 flex items-end justify-end">
            <ResponseButton ures={e.responses} eid={e.emailId} />
          </div>
        </div>
      ))}
    </div>
  );
}
