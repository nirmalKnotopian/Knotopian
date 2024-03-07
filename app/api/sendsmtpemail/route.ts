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
      const AmpHTML = `<!DOCTYPE html>
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
            input[type="radio"] {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              border: 2px solid #333;
              border-radius: 50%;
              outline: none;
              cursor: pointer;
              background-color:blue;
            }
            
        
            input[type="radio"]:checked {
              background-color: yellow; 
              border-color: blue; 
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
          <p style="font-weight:500;letter-spacing:0.4px;">
              We are a fastest growing eLearning production company with innovation as our core value. We design and develop custom learning solutions for the organizations, educational institutions, and NGOs. Our team is passionate about designing innovative eLearning strategies and solutions that concentrate on enhancing the workforce’s skills, attitudes, and efficiency and thereby producing measurable results with return on investment.
            </p>
            <hr/>

            <br/>
    <input type="hidden" name="emailId" id="emailId" value="${emailId?.toString()}" />
    <input type="hidden" name="uEmail" id="uEmail" value="${r?.toString()}" />
    <input type="hidden" name="totalquestions" id="totalquestions" value="${EmailQuestions?.length.toString()}" />
    <div  [class]="questionsState.selectedQuestion == 1 ? 'show' : 'hide'" style="margin-bottom: 20px">
      <label style="font-size: 18px; margin-bottom: 10px; color: #333;font-weight:600;">
        ${firstQuestion}
      </label>
      <br />
      <label for="q1yes" style="display:flex;align-items:center;margin-top:4px;margin-bottom:4px;">
        <input type="radio" id="q1yes"  name="question1" value="yes"  on="change:AMP.setState({questionsState: {showLink:true} }),myform.submit"> Yes
      </label>
      <label for="q1no" style="display:flex;align-items:center;margin-top:4px;margin-bottom:4px;">
        <input type="radio" id="q1no" name="question1" value="no"  on="change:AMP.setState({questionsState: {selectedQuestion: 2,showLink:false}}),myform.submit"> No
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
      <label for="q${index + 2}yes" style="display:flex;align-items:center;margin-top:4px;margin-bottom:4px;">
        <input type="radio" id="q${index + 2}yes"  name="question${index + 2}"  value="yes" on="change:AMP.setState({questionsState: {showLink:true} }),myform.submit"> Yes
      </label>
      <label for="q${index + 2}no" style="display:flex;align-items:center;margin-top:4px;margin-bottom:4px;">
        <input type="radio" id="q${index + 2}no" name="question${index + 2}"  value="no" on="change:AMP.setState({questionsState: {selectedQuestion: ${index + 3},showLink:false} }),myform.submit"> No
      </label>
    </div>`
         );
       }, "")}     
       <label for="stillInterested" class="hide" [class]="questionsState.selectedQuestion == ${RestOfQuestion.length + 2} ? 'show' : 'hide'" style="margin-bottom: 20px">
       <h1 style="font-size: 18px; margin-bottom: 10px; color: #333">
        Are You Still Interested In Proceeding? 
       </h1>
       <input type="radio" id="considerLater" on="change:myform.submit"  name="stillInterested" value="Consider Later"     > Consider Later
       <input type="radio" id="NotInterested"  name="stillInterested" on="change:myform.submit" value="Not Interested Anymore"   > Not Interested Anymore     
     </label>  
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
           hidden
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
      const plainHTML = `<!DOCTYPE html>
       <html >
         <head>
           <meta charset="utf-8" />
           <style>
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
             input[type="radio"] {
               -webkit-appearance: none;
               -moz-appearance: none;
               appearance: none;
               width: 16px;
               height: 16px;
               border: 2px solid #333;
               border-radius: 50%;
               outline: none;
               cursor: pointer;
               background-color:blue;
             }
             
         
             input[type="radio"]:checked {
               background-color: yellow; 
               border-color: blue; 
             }
 
           </style>
         </head>
         <body style="
               padding : 20px 10px; 
                      background-color:blue;
                      ">
     
           
           <form
             action="https://emailmodo.vercel.app/api/receiveEmail"
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
                <img  alt="logo"  width="120" 
         height="30" style="object-fit:contain;background-color:#d3d3d3" src="https://knotopian.com/wp-content/uploads/2022/05/3.png" />
               
           <p style="font-weight:500;letter-spacing:0.4px;">
               We are a fastest growing eLearning production company with innovation as our core value. We design and develop custom learning solutions for the organizations, educational institutions, and NGOs. Our team is passionate about designing innovative eLearning strategies and solutions that concentrate on enhancing the workforce’s skills, attitudes, and efficiency and thereby producing measurable results with return on investment.
             </p>
             <br/>
     <input type="hidden" name="emailId" id="emailId" value="${emailId?.toString()}" />
     <input type="hidden" name="uEmail" id="uEmail" value="${r?.toString()}" />
     <input type="hidden" name="totalquestions" id="totalquestions" value="${EmailQuestions?.length.toString()}" />
     <div style="margin-bottom: 20px">
       <label style="font-size: 18px; margin-bottom: 10px; color: #333;font-weight:600;">
         ${firstQuestion}
       </label>
       <label for="q1yes" style="display:flex;align-items:center;margin-top:4px;margin-bottom:4px;">
       <input type="radio" id="q1yes"  name="question1" value="yes" > Yes
      </label>
         <label for="q1no" style="display:flex;align-items:center;margin-top:4px;margin-bottom:4px;">
       <input type="radio" id="q1no" name="question1" value="no" > No
     </label>
     <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
     If Yes Use the calendar to set up a quick sync-up at your convenience to
     discuss further.
      </h5>

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
    >
<a    href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="text-decoration:none;color:#fff" >Schedule A Meeting</a>

</button>
     <br />

       <br />
      
   
     </div>
        ${RestOfQuestion?.reduce((acc, q, index) => {
          return (
            acc +
            `<div style="margin-bottom: 20px">
                      <label style="font-size: 18px; margin-bottom: 10px; color: #333;font-weight:600;">
                    ${q}
                  </label>
                  <br />
                  <label for="q${index + 2}yes" style="display:flex;align-items:center;margin-top:4px;margin-bottom:4px;">
                  <input type="radio" id="q${index + 2}yes"  name="question${index + 2}"  value="yes"> Yes
                </label>
                <label for="q${index + 2}no" style="display:flex;align-items:center;margin-top:4px;margin-bottom:4px;">
                  <input type="radio" id="q${index + 2}no" name="question${index + 2}"  value="no"> No
                </label>
                  <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                  If Yes Use the calendar to set up a quick sync-up at your convenience to
                  discuss further.
                    </h5>
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
                   >
           <a    href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="text-decoration:none;color:#fff" >Schedule A Meeting</a>
             
           </button>
           
                  
                </div>`
          );
        }, "")}     
        <label for="stillInterested" style="margin-bottom: 20px">
        <h1 style="font-size: 18px; margin-bottom: 10px; color: #333">
         Are You Still Interested In Proceeding? 
        </h1>
        <input type="radio" id="considerLater"  name="stillInterested" value="Consider Later"    > Consider Later
        <input type="radio" id="NotInterested"  name="stillInterested" value="Not Interested Anymore"   > Not Interested Anymore     
         </label>  
         <br/>
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
                     >
             <a    href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="text-decoration:none;color:#fff" >Schedule A Meeting</a>
               
             </button>
             <p>
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
        amp: AmpHTML, // html body
        html: plainHTML,
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
