"use client";
import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "@/firebase";
import router from "next/router";
function Deletebutton({ id }: { id: string }) {
  const deleteEmail = async () => {
    try {
      await deleteDoc(doc(db, "emails", id));
      toast.success("Deleted");
      window.location.reload();
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
