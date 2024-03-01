import nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
const { v4: uuidv4 } = require("uuid");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "boostmysitesleads@gmail.com",
    pass: "xvau xttv raeb lfhf",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { subject, text, receps } = await req.json();
    const q = await getDoc(doc(db, "emailquestions", "z8TggwoJcPiyqmKtw3dp"));
    // console.log("Subject", subject);
    // console.log("text", text);
    if (!q.exists()) throw "Add Some Questions To Database First";
    const EmailQuestions: string[] = q.data()?.questions as string[];
    const firstQuestion = EmailQuestions[0];
    const RestOfQuestion = EmailQuestions.slice(1);
    console.log("EmailQuestions", EmailQuestions);
    console.log("first", firstQuestion);
    console.log("rest", RestOfQuestion);
    const emailId = uuidv4();
    await addDoc(collection(db, "emails"), {
      emailId,
      subject,
      text,
      responses: [],
      createdAt: serverTimestamp(),
    });
    const emails = receps?.map(async (r: string) => {
      const clientChoiceEmail = `<!DOCTYPE html>
      <html ⚡4email data-css-strict>
        <head>
          <meta charset="utf-8" />
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script
            async
            custom-element="amp-form"
            src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
          ></script>
          <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
          <script
            async
            custom-element="amp-bind"
            src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
          ></script>
          <style amp4email-boilerplate>
            body {
              visibility: hidden;
            }
          </style>
          <style amp-custom>
            /* any custom styles go here. */
            
            .hide {
              display: none;
            }
            .show {
              display: block;
            }
          </style>
        </head>
        <body style="
              padding : 20px 10px; 
                     background-color:blue;
                     ">
          <amp-state id="questionsState">
            <script type="application/json">
              {
                "selectedQuestion": 1,
                "showLink":false
              }
            </script>
          </amp-state>
          
          <form
            action-xhr="https://emailmodo.vercel.app/api/receiveEmail"
            method="POST"
                      style="
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                "
              id="myform"
          >
               <amp-img  alt="logo"  width="120" 
        height="30" style="object-fit:contain;background-color:#d3d3d3" layout="fixed" src="https://knotopian.com/wp-content/uploads/2022/05/3.png" >
              </amp-img>
            <br/>
    <input type="hidden" name="emailId" id="emailId" value="${emailId?.toString()}" />
    <input type="hidden" name="uEmail" id="uEmail" value="${r?.toString()}" />
    <input type="hidden" name="totalquestions" id="totalquestions" value="${EmailQuestions?.length.toString()}" />
    <div  [class]="questionsState.selectedQuestion == 1 ? 'show' : 'hide'" style="margin-bottom: 20px">
      <label style="font-size: 18px; margin-bottom: 10px; color: #333">
        ${firstQuestion}
      </label>
      <br />
      <label for="q1yes">
        <input type="radio" id="q1yes" style="background-color: #007bff;color:#007bff" name="question1" value="yes"  on="change:AMP.setState({questionsState: {showLink:true} }),myform.submit"> Yes
      </label>
      <label for="q1no">
        <input type="radio" id="q1no" name="question1" value="no"  on="change:AMP.setState({questionsState: {selectedQuestion: 2}}),myform.submit"> No
      </label>
    </div>
       ${RestOfQuestion?.reduce((acc, q, index) => {
         return (
           acc +
           `<div class="hide" [class]="questionsState.selectedQuestion == ${index + 2} ? 'show' : 'hide'" style="margin-bottom: 20px">
      <label style="font-size: 18px; margin-bottom: 10px; color: #333">
        ${q}
      </label>
      <br />
      <label for="q${index + 2}yes">
        <input type="radio" id="q${index + 2}yes" style="background-color: #007bff;color:#007bff" name="question${index + 2}"  value="yes" on="change:AMP.setState({questionsState: {showLink:true} }),myform.submit"> Yes
      </label>
      <label for="q${index + 2}no">
        <input type="radio" id="q${index + 2}no" name="question${index + 2}"  value="no" on="change:AMP.setState({questionsState: {selectedQuestion: ${index + 3}} }),myform.submit"> No
      </label>
    </div>`
         );
       }, "")}     
    
            <button 
                     style="
                    background-color: #E4D00A;
                    color: #fff;
                    border: none;
                    padding: 8px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 4px;
                    margin-top:10px;
                  "
                    hidden [hidden]="questionsState.showLink==false"
                    >
            <a    href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="text-decoration:none;color:#fff" >Schedule A Meeting</a>
              
            </button>
            <p  hidden [hidden]="questionsState.showLink==false">
              Use the calendar to set up a quick sync-up at your convenience to discuss further.
            </p>
           <br/> <button
                        style="
                    background-color: green;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 4px;
                    margin-top:10px;
                  "
                    type="submit">Submit</button>
             <div submit-success
                  style="padding:4px"
                  >
          <template type="amp-mustache">
            <p style="color:green;">
           Success!.
            </p>
          </template>
        </div>
        <div submit-error style="padding:4px">
          <template type="amp-mustache" >
            <p style="color:red;">
            Error! Please Try Again
            </p>
          </template>
        </div>
          </form>
        </body>
      </html>`;

      await transporter.sendMail({
        from: "emailmodo@gmail.com", // sender address
        to: r, // list of receivers
        subject: subject || "AMP Testing For Chatlet", // Subject line
        text:
          text ||
          "There is a new article. It's about sending emails, check it out!", // plain text body
        amp: clientChoiceEmail, // html body
        html: "<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>",
      });
    });
    await Promise.all(emails);
    // console.log(res);
    return NextResponse.json({
      status: 1,
      data: { message: "Emails Sent" },
    });
  } catch (e: any) {
    console.log(e, "Here");
    return NextResponse.json(
      { status: 0, data: { message: e.message } },
      { status: 400 },
    );
  }
}

//noumansajid95@gmail.com
