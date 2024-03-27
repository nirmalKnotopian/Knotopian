"use client";
import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "@/firebase";
import { revalidateEmailsPath } from "../serverActions/revalidate";
function Deletebutton({ id }: { id: string }) {
  const deleteEmail = async () => {
    try {
      const toastId = toast.promise(
        new Promise(async (resolve, reject) => {
          await deleteDoc(doc(db, "emails", id));
          resolve("Success");
        }),
        {
          pending: "Deleting...",
          success: "Deleted successfully",
          error: "Failed to delete",
        },
      );
      revalidateEmailsPath();
    } catch (e) {
      console.log(e);
      toast.error("Couldnt Delete");
    }
  };
  return (
    <div className="cursor-pointer text-red-400" onClick={deleteEmail}>
      Delete
    </div>
  );
}

export default Deletebutton;
