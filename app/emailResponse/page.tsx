import React from "react";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import ResponseButton from "@/components/showResponseButton/ResponseButton";
import { toast } from "react-toastify";
import { Delete } from "lucide-react";
import Deletebutton from "@/components/DeleteButton.tsx/Deletebutton";
import Router from "next/router";
import {
  revalidatePath,
  unstable_cache,
  unstable_noStore as nostore,
} from "next/cache";
import { Timestamp } from "firebase/firestore";
const getEmails = async () => {
  try {
    const emails = await getDocs(query(collection(db, "emails")));
    const emailResponseList: Array<EmailResponse & { createdAt?: Timestamp }> =
      [];
    emails.forEach((e) => {
      emailResponseList.push({
        ...(e.data() as EmailResponse & { createdAt?: Timestamp }),
        id: e.id,
      });
    });
    return emailResponseList;
  } catch (e) {
    console.log(e);
  }
};

export default async function EmailResponse() {
  nostore();
  const emailResponses = await getEmails();
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Email Responses
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-stroke dark:border-strokedark">
            <thead>
              <tr className="dark:border-bdark border-b border-stroke px-4 py-4.5">
                <th className="px-4 py-4.5 text-start">
                  <p className="font-medium">Email Id</p>
                </th>
                <th className="px-4 py-4.5 text-start">
                  <p className="font-medium">Sent At</p>
                </th>
                <th className="hidden px-4 py-4.5 text-start sm:table-cell">
                  <p className="font-medium">Subject</p>
                </th>
                <th className="hidden px-4 py-4.5 text-start sm:table-cell">
                  <p className="font-medium">Text</p>
                </th>
                <th className="hidden px-4 py-4.5 text-start sm:table-cell">
                  <p className="font-medium">Actions</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {emailResponses?.map((e) => (
                <tr
                  key={e.emailId}
                  className="dark:border-bdark border-b border-stroke px-4 py-4.5"
                >
                  <td className="px-4 py-4.5">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <p className="text-sm text-black dark:text-white">
                        {e.emailId}
                      </p>
                    </div>
                  </td>
                  <td className="hidden px-4 py-4.5 sm:table-cell">
                    <p className="text-sm text-black dark:text-white">
                      {e.createdAt?.toDate().toString()}
                    </p>
                  </td>
                  <td className="hidden px-4 py-4.5 sm:table-cell">
                    <p className="text-sm text-black dark:text-white">
                      {e.subject}
                    </p>
                  </td>
                  <td className="hidden px-4 py-4.5 sm:table-cell">
                    <p className="text-sm text-black dark:text-white">
                      {e.text}
                    </p>
                  </td>
                  <td className="flex hidden items-center space-x-2 px-4 py-4.5 sm:table-cell">
                    <ResponseButton ures={e.responses} eid={e.emailId} />
                    <Deletebutton id={e.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
