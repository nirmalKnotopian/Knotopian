import { NextRequest, NextResponse } from "next/server";
import {
  addDoc,
  and,
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
import { revalidatePath } from "next/cache";
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const eid = data.get("emailId");
    const uEmail = data.get("uEmail");
    const stillInterested = data.get("stillInterested");
    const responses: any = {};
    const totalquestions = data.get("totalquestions");
    const numQuestions = totalquestions
      ? parseInt(totalquestions as string, 10)
      : 0;
    console.log("Total Questions", totalquestions);
    for (let i = 1; i <= numQuestions; i++) {
      const questionResponse = data.get(`question${i}`);
      console.log("q response " + i, questionResponse);

      responses[`q${i}`] = questionResponse;
    }
    responses["stillInterested"] = stillInterested;
    const q = query(collection(db, "emails"), and(where("emailId", "==", eid)));
    const email = await getDocs(q);
    if (email.size > 0) {
      const emailData = email.docs[0]?.data();
      console.log(emailData, "emailData");
      const updatedResponses = emailData?.responses?.map(
        (r: { response: any; userEmail: string }) => {
          if (r.userEmail === uEmail) {
            return { ...r, response: responses };
          }
          return r;
        },
      );
      await updateDoc(doc(db, "emails", email.docs[0].id), {
        responses: updatedResponses,
      });
    } else {
      throw new Error("No Email Exists");
    }
    revalidatePath("/");
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
