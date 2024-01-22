import React from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
const getEmails = async () => {
  const emails = await getDocs(query(collection(db, "emails")));
  const emailResponseList = [];
  const updatedList = emails.forEach((e) => emailResponseList.push(e.data()));
  return updatedList;
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
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Price</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Sold</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Profit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
