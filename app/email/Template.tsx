import React from "react";
import { Button, Preview, Html, Heading } from "@react-email/components";

function TemplateEmail() {
  return (
    <Html>
      <Preview>New Message From Us</Preview>
      <Heading>Enter Test Data</Heading>
      <form
        action={`https://emailmodo.vercel.app/api/receiveEmail`}
        method="POST"
      >
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
