import React from "react";
import { Button, Preview, Html, Heading } from "@react-email/components";

function TemplateEmail({
  emailId,
  userEmail,
}: {
  emailId: string;
  userEmail: string;
}) {
  return (
    <Html>
      <Preview>New Message From Us</Preview>
      <Heading>Enter Test Data</Heading>
      <form
        action={`${process.env.NEXT_PUBLIC_DOMAIN}/api/receiveEmail`}
        method="POST"
      >
        <label htmlFor="emailId" className="hidden">
          Username:
        </label>
        <input
          name="emailId"
          id="emailId"
          type="text"
          value={emailId}
          className="bg-red hidden border-blue-400"
        />
        <label htmlFor="uEmail" className="hidden">
          userEmail:
        </label>
        <input
          name="uEmail"
          id="uEmail"
          type="text"
          value={userEmail}
          className="bg-red hidden border-blue-400"
        />
        <label htmlFor="response">Username:</label>
        <input
          name="response"
          id="response"
          type="text"
          className="bg-red border-blue-400"
        />
        <button type="submit">Submit Response</button>
      </form>
    </Html>
  );
}

export default TemplateEmail;
