import React from "react";
import { Button, Preview, Html, Heading } from "@react-email/components";

function TemplateEmail({
  emailId,
  userEmail,
}: {
  emailId: string;
  userEmail: string;
}) {
  const innerHTML = `
    <form 
    action={\`https://emailmodo.vercel.app/api/receiveEmail\`}
    method="POST"
    style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  
      <section style="margin-bottom: 20px;">
  
        <h2 style="font-size: 18px; margin-bottom: 10px; color: #333;">
          1. Would you love to partner with KNOTOPIAN for your outsourcing projects?
        </h2>
  
        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px;">
          If Yes Use the calendar to set up a quick sync-up at your convenience to discuss further.
        </h5>
  
        <input style="width: 100%; padding: 10px; font-size: 16px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" type="date" name="question1" />
      </section>
  
      <section style="margin-bottom: 20px;">
  
        <h2 style="font-size: 18px; margin-bottom: 10px; color: #333;">
          2. Trust us, you are missing a great deal already! Okay, would you give us a chance to display our portfolio?
        </h2>
  
        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px;">
          If Yes Use the calendar to set up a quick sync-up at your convenience to discuss further.
        </h5>
  
        <input style="width: 100%; padding: 10px; font-size: 16px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" type="date" name="question2" />
      </section>
  
      <section style="margin-bottom: 20px;">
  
        <h2 style="font-size: 18px; margin-bottom: 10px; color: #333;">
          3. Uhm, we still don’t want to miss a chance to let you know how much we can help you! After all, we have a record of creating JAW-DROPPING eLearning in just 7 days! Would you want to know how flexible is Knotopian’s collaboration framework?
        </h2>
  
        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px;">
          If Yes Use the calendar to set up a quick sync-up at your convenience to discuss further.
        </h5>
  
        <input style="width: 100%; padding: 10px; font-size: 16px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" type="date" name="question3" />
      </section>
  
      <section style="margin-bottom: 20px;">
  
        <h2 style="font-size: 18px; margin-bottom: 10px; color: #333;">
          4. Ouch! Give us a FEW minutes and SAVE huge! You won’t regret. Just letting you know our team will be available 24x7 to supporting your needs. Cool, let’s think of the partnership later. But, how about a quick sync-up to just know us better?
        </h2>
  
        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px;">
          If Yes Use the calendar to set up a quick sync-up at your convenience to discuss further.
        </h5>
  
        <input style="width: 100%; padding: 10px; font-size: 16px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" type="date" name="question4" />
      </section>
  
      <section style="margin-bottom: 20px;">
  
        <h2 style="font-size: 18px; margin-bottom: 10px; color: #333;">
          5. We just WON a LearnX Gold Award for one of our innovative learning solutions. Just letting you know! And yeah, we still want to meet you. After all, we both work towards the same goal – Creating Impactful Learning.
        </h2>
  
        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px;">
          If Yes Use the calendar to set up a quick sync-up at your convenience to discuss further.
        </h5>
  
        <input style="width: 100%; padding: 10px; font-size: 16px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" type="date" name="question5" />
      </section>
  
      <button style="background-color: #4caf50; color: #fff; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 4px;" type="submit">Submit</button>
  
    </form>
 
  `;

  return (
    <Html>
      <Preview>New Message From Us</Preview>
      <Heading>Enter Test Data</Heading>
      <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
    </Html>
  );
}

export default TemplateEmail;
