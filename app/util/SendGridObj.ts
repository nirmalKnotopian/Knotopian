import { Resend } from "resend";

const ResnedObj = new Resend(process.env.EMAIL_API_KEY2);
export default ResnedObj;
