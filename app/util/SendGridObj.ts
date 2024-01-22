import { Resend } from "resend";

const ResnedObj = new Resend(process.env.NEXT_PUBLIC_EMAIL_API_KEY2);
export default ResnedObj;
