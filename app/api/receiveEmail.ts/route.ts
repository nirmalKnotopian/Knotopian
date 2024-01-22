import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const r = data.get("response");
    // const text = data.get("text");
    console.log("User response From EMail ", r);
    const res = await fetch(
      "https://emailmodo-2664b-default-rtdb.firebaseio.com/respnse.json",
      {
        body: JSON.stringify({
          subject: r,
        }),
        method: "POST",
      },
    );
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
