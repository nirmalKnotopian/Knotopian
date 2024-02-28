import React, { useEffect } from "react";
import TrackingCard from "./TrackingCard";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-toastify";

async function EmailSentCard() {
  const total = await getTotalEmails();
  return (
    <TrackingCard
      title={"Total Emails Sent \n"}
      value={total?.toString() || "0"}
    />
  );
}

const getTotalEmails = async () => {
  try {
    const docs = await getDocs(collection(db, "emails"));
    return docs.size;
  } catch (e) {
    throw e;
  }
};
export default EmailSentCard;
