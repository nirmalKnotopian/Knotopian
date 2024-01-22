import { NextRequest, NextResponse } from "next/server";
import NextObj from "../../util/SendGridObj";
import TemplateEmail from "@/app/email/Template";
import React from "react";
import { db } from "@/firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { UUID, randomUUID } from "crypto";
export async function POST(req: NextRequest) {
  try {
    console.log("Recieved");
    const { subject, text } = await req.json();
    console.log("Subject", subject);
    console.log("text", text);
    const emailId = randomUUID();
    await addDoc(collection(db, "emails"), {
      emailId,
      subject,
      text,
    });
    const res = await NextObj.emails.send({
      from: "emailmodo@resend.dev",
      subject,
      to: "noumankhan95@yahoo.com",
      text,
      react: React.createElement(TemplateEmail, { emailId }),
    });
    console.log(res);
    return NextResponse.json({
      status: 0,
      data: { message: res.data, error: res.error },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 0, data: { message: e } });
  }
}
