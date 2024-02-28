import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-toastify";
import TrackingCard from "./TrackingCard";
async function TotalResponses() {
  const size = await getTotalResponses();
  return (
    <TrackingCard title="Total Responses Received" value={size.toString()} />
  );
}
async function getTotalResponses() {
  const responsesRef = collection(db, `emails`);

  try {
    const querySnapshot = await getDocs(responsesRef);
    let totalSize = 0;
    if (querySnapshot.empty) return totalSize;
    querySnapshot.forEach((doc) => {
      const response = doc.data()?.responses?.length;
      totalSize += response || 0;
    });

    return totalSize;
  } catch (error) {
    throw error;
  }
}
export default TotalResponses;
