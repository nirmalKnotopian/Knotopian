import { NextRequest, NextResponse } from "next/server";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const q1 = data.get("question1");
    const q2 = data.get("question2");
    const q3 = data.get("question3");
    const q4 = data.get("question4");
    const q5 = data.get("question5");

    const eid = data.get("emailId");
    const uEmail = data.get("uEmail");
    // const text = data.get("text");
    console.log("User response From EMail ", { q1, q2, q3, q4, q5 });
    const q = query(collection(db, "emails"), where("emailId", "==", eid));
    const email = await getDocs(q);
    if (email.size > 0) {
      // Access the data of the first document (you may loop through querySnapshot.docs for multiple documents)
      const emailData = email.docs[0].data();
      await updateDoc(doc(db, "emails", email.docs[0].id), {
        responses: arrayUnion({
          response: { q1, q2, q3, q4, q5 },
          userEmail: uEmail,
        }),
      });
    } else {
      throw "No Email Exists";
    }
    return NextResponse.json(
      {
        status: 1,
        data: { message: "Success" },
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e, "Error inreceive Email");
    return NextResponse.json(
      { status: 0, data: { message: e } },
      { status: 403 },
    );
  }
}
