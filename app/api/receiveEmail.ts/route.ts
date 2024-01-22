import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const response = data.get("response");
    // const text = data.get("text");
    await fetch(
      "https://emailmodo-2664b-default-rtdb.firebaseio.com/respnse.json",
      {
        body: JSON.stringify({
          subject: response,
        }),
        method: "POST",
      },
    );
    return NextResponse.json({ status: 1, data: { message: "Success" } });
  } catch (e) {
    return NextResponse.json({ status: 0, data: { message: e } });
  }
}
