import nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";
import { addDoc, collection } from "firebase/firestore";
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
    // const { subject, text, receps } = await req.json();
    const a = await req.formData();
    const subject = a.get("subject");
    const text = a.get("text");
    // const receps = a.get("receps");
    const receps = ["darapuhemanand998@gmail.com","noumansajid95@gmail.com"];
    console.log("Subject", subject);
    console.log("text", text);
    const emailId = uuidv4();
    await addDoc(collection(db, "emails"), {
      emailId,
      subject,
      text,
    });
    const emails = receps?.map(async (r: string) => {
      const innerHTML = `
      <!DOCTYPE html>
      <html ⚡4email data-css-strict>
        <head>
          <meta charset="utf-8" />
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script
            async
            custom-element="amp-form"
            src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
          ></script>
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
        <body>
          <amp-state id="questionsState">
            <script type="application/json">
              {
                "selectedQuestion": 1
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
          >
            <amp-img height=150 width=200 alt="logo" src="https://www.canterburypilgrimages.com/wp-content/uploads/2021/04/dummy-logo-5b.png" >
              </amp-img>
            
            <input
              type="hidden"
              name="emailId"
              id="emailId"
              value="${emailId?.toString()}"
            />
            <input type="hidden" name="uEmail" id="uEmail" value="${r?.toString()}" />
            <!-- Question 1 -->
            <div [class]="questionsState.selectedQuestion >= 1 ? 'show' : 'hide'" style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                1. Would you love to partner with KNOTOPIAN for your outsourcing
                projects?
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience
                to discuss further.
              </h5>
            <a href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="font-size: 18px; margin-bottom: 10px; color: green">Schedule A Meeting</a>
              <br/>
               <label for="q1yes">
            <input type="radio" id="q1yes" name="question1" value="no"   on="change:AMP.setState({questionsState: {selectedQuestion: 2} })"> No
          </label>
              
            </div>
      
            <!-- Question 2 -->
            <div hidden [hidden]="questionsState.selectedQuestion < 2" style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                2. Trust us, you are missing a great deal already! Okay, would you
                give us a chance to display our portfolio?
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience
                to discuss further.
              </h5>
              <!-- Your question 2 content here -->
               <a href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="font-size: 18px; margin-bottom: 10px; color: green">Schedule A Meeting</a>
              <br/>
               <label for="q2yes">
            <input type="radio" id="q2yes" name="question2" value="no"   on="change:AMP.setState({questionsState: {selectedQuestion: 3} })"> No
          </label>
            </div>
      
            <!-- Question 3 -->
            <div hidden [hidden]="questionsState.selectedQuestion < 3" style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                3. Uhm, we still don’t want to miss a chance to let you know how much
                we can help you! After all, we have a record of creating JAW-DROPPING
                eLearning in just 7 days! Would you want to know how flexible is
                Knotopian’s collaboration framework?
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience
                to discuss further.
              </h5>
                <a href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="font-size: 18px; margin-bottom: 10px; color: green">Schedule A Meeting</a>
              <br/>
               <label for="q3yes">
            <input type="radio" id="q3yes" name="question3" value="no"   on="change:AMP.setState({questionsState: {selectedQuestion: 4} })"> No
          </label>
            </div>
      
            <!-- Question 4 -->
            <div hidden [hidden]="questionsState.selectedQuestion < 4" style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                4. Ouch! Give us a FEW minutes and SAVE huge! You won’t regret. Just
                letting you know our team will be available 24x7 to supporting your
                needs. Cool, let’s think of the partnership later. But, how about a
                quick sync-up to just know us better?
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience
                to discuss further.
              </h5>
                <a href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="font-size: 18px; margin-bottom: 10px; color: green">Schedule A Meeting</a>
              <br/>
               <label for="q4yes">
            <input type="radio" id="q4yes" name="question4" value="no"   on="change:AMP.setState({questionsState: {selectedQuestion: 5} })"> No
          </label>
            </div>
      
            <!-- Question 5 -->
            <div hidden [hidden]="questionsState.selectedQuestion < 5" style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                5. We just WON a LearnX Gold Award for one of our innovative learning
                solutions. Just letting you know! And yeah, we still want to meet you.
                After all, we both work towards the same goal – Creating Impactful
                Learning.
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience
                to discuss further.
              </h5>
                 <a href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="font-size: 18px; margin-bottom: 10px; color: green">Schedule A Meeting</a>
              <br/>
               <label for="q5yes">
            <input type="radio" id="q5yes" name="question5" value="Consider Later"   > Consider Later
            <input type="radio" id="q5yes" name="question5" value="Not Interested Anymore"   > Not Interested Anymore     
          </label>
            </div> 
            <button
                        style="
                    background-color: #4caf50;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 4px;
                    margin-top:10px;
                  "
                    hidden [hidden]="questionsState.selectedQuestion < 5" type="submit">Submit</button>
          </form>
        </body>
      </html>
        `;

      const ampEmail = `<!DOCTYPE html>
      <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
        <style amp4email-boilerplate>body{visibility:hidden}</style>
      </head>
      <body>
        <div>
          <form
            action-xhr="https://emailmodo.vercel.app/api/receiveEmail"
            method="POST"
            target="_top"
            submit-nonce="YOUR_SUBMIT_NONCE"
          >
            <input type="hidden" name="emailId" id="emailId" value="${emailId?.toString()}" />
            <input type="hidden" name="uEmail" id="uEmail" value="${r?.toString()}" />
      
            <!-- Question 1 -->
            <section [class]="selectedQuestion === 1 ? 'show' : 'hide'">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                1. Would you love to partner with KNOTOPIAN for your outsourcing projects?
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience to
                discuss further.
              </h5>
              <input
                style="
                  width: 100%;
                  padding: 10px;
                  font-size: 16px;
                  margin-top: 5px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                "
                type="date"
                name="question1"
                on="change:AMP.setState({selectedQuestion: 2})"
              />
            </section>
      
            <!-- Question 2 -->
            <section [class]="selectedQuestion === 2 ? 'show' : 'hide'">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                2. Trust us, you are missing a great deal already! Okay, would you give us
                a chance to display our portfolio?
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience to
                discuss further.
              </h5>
              <input
                style="
                  width: 100%;
                  padding: 10px;
                  font-size: 16px;
                  margin-top: 5px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                "
                type="date"
                name="question2"
                on="change:AMP.setState({selectedQuestion: 3})"
              />
            </section>
      
            <!-- Question 3 -->
            <section [class]="selectedQuestion === 3 ? 'show' : 'hide'">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                3. Uhm, we still don’t want to miss a chance to let you know how much we
                can help you! After all, we have a record of creating JAW-DROPPING
                eLearning in just 7 days! Would you want to know how flexible is
                Knotopian’s collaboration framework?
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience to
                discuss further.
              </h5>
              <input
                style="
                  width: 100%;
                  padding: 10px;
                  font-size: 16px;
                  margin-top: 5px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                "
                type="date"
                name="question3"
                on="change:AMP.setState({selectedQuestion: 4})"
              />
            </section>
      
            <!-- Question 4 -->
            <section [class]="selectedQuestion === 4 ? 'show' : 'hide'">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                4. Ouch! Give us a FEW minutes and SAVE huge! You won’t regret. Just
                letting you know our team will be available 24x7 to supporting your needs.
                Cool, let’s think of the partnership later. But, how about a quick sync-up
                to just know us better?
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience to
                discuss further.
              </h5>
              <input
                style="
                  width: 100%;
                  padding: 10px;
                  font-size: 16px;
                  margin-top: 5px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                "
                type="date"
                name="question4"
                on="change:AMP.setState({selectedQuestion: 5})"
              />
            </section>
      
            <!-- Question 5 -->
            <section [class]="selectedQuestion === 5 ? 'show' : 'hide'">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                5. We just WON a LearnX Gold Award for one of our innovative learning
                solutions. Just letting you know! And yeah, we still want to meet you.
                After all, we both work towards the same goal – Creating Impactful
                Learning.
              </label>
              <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                If Yes, use the calendar to set up a quick sync-up at your convenience to
                discuss further.
              </h5>
              <input
                style="
                  width: 100%;
                  padding: 10px;
                  font-size: 16px;
                  margin-top: 5px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                "
                type="date"
                name="question5"
              />
            </section>
      
            <button
              [class]="selectedQuestion === 5 ? 'show' : 'hide'"
              style="
                background-color: #4caf50;
                color: #fff;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
                margin-top: 10px;
              "
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      
        <style amp-custom>
          body {
            font-family: Arial, sans-serif;
          }
      
          .hide {
            display: none;
          }
      
          .show {
            display: block;
          }
        </style>
      </body>
      </html>
      `;
      const apmHidden = `<!DOCTYPE html>
      <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style amp4email-boilerplate>body{visibility:hidden}</style>
       <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
        <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
        <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
          <style amp-custom>
            body {
              font-family: Arial, sans-serif;
            }
        
            .hide {
              display: none;
            }
        
            .show {
              display: block;
            }
          </style>
      </head>
      <body>
        <div>
          <form
            action-xhr="https://emailmodo.vercel.app/api/receiveEmail"
            method="POST"
          >
            <input type="hidden" name="emailId" id="emailId" value="${emailId?.toString()}" />
            <input type="hidden" name="uEmail" id="uEmail" value="${r?.toString()}" />
      
            <amp-state id="questionsState">
              <script type="application/json">
                {
                  "selectedQuestion": 1
                }
              </script>
            </amp-state>
      
            <amp-selector layout="container" name="questionSelector" on="select:AMP.setState({ selectedQuestion: event.targetOption })">
              <div option="1" selected="selected"></div>
              <div option="2"></div>
              <div option="3"></div>
              <div option="4"></div>
              <div option="5"></div>
            </amp-selector>
      
            <template  type="amp-mustache">
              <!-- Question 1 -->
              <section [hidden]="questionsState.selectedQuestion !== 1">
                <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                  1. Would you love to partner with KNOTOPIAN for your outsourcing projects?
                </label>
                <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                  If Yes, use the calendar to set up a quick sync-up at your convenience to
                  discuss further.
                </h5>
                <input
                  style="
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                    margin-top: 5px;
                    box-sizing: border-box;
                    "
                    type="date"
                    name="question1"
                  />
                </section>
        
                <!-- Question 2 -->
                <section [hidden]="questionsState.selectedQuestion !== 2">
                  <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                    2. Trust us, you are missing a great deal already! Okay, would you give us
                    a chance to display our portfolio?
                  </label>
                  <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                    If Yes, use the calendar to set up a quick sync-up at your convenience to
                    discuss further.
                  </h5>
                  <input
                    style="
                      width: 100%;
                      padding: 10px;
                      font-size: 16px;
                      margin-top: 5px;
                      box-sizing: border-box;
                    "
                    type="date"
                    name="question2"
                  />
                </section>
        
                <!-- Question 3 -->
                <section [hidden]="questionsState.selectedQuestion !== 3">
                  <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                    3. Uhm, we still don’t want to miss a chance to let you know how much we
                    can help you! After all, we have a record of creating JAW-DROPPING
                    eLearning in just 7 days! Would you want to know how flexible is
                    Knotopian’s collaboration framework?
                  </label>
                  <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                    If Yes, use the calendar to set up a quick sync-up at your convenience to
                    discuss further.
                  </h5>
                  <input
                    style="
                      width: 100%;
                      padding: 10px;
                      font-size: 16px;
                      margin-top: 5px;
                      box-sizing: border-box;
                    "
                    type="date"
                    name="question3"
                  />
                </section>
        
                <!-- Question 4 -->
                <section [hidden]="questionsState.selectedQuestion !== 4">
                  <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                    4. Ouch! Give us a FEW minutes and SAVE huge! You won’t regret. Just
                    letting you know our team will be available 24x7 to supporting your needs.
                    Cool, let’s think of the partnership later. But, how about a quick sync-up
                    to just know us better?
                  </label>
                  <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                    If Yes, use the calendar to set up a quick sync-up at your convenience to
                    discuss further.
                  </h5>
                  <input
                    style="
                      width: 100%;
                      padding: 10px;
                      font-size: 16px;
                      margin-top: 5px;
                      box-sizing: border-box;
                    "
                    type="date"
                    name="question4"
                  />
                </section>
        
                <!-- Question 5 -->
                <section [hidden]="questionsState.selectedQuestion !== 5">
                  <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                    5. We just WON a LearnX Gold Award for one of our innovative learning
                    solutions. Just letting you know! And yeah, we still want to meet you.
                    After all, we both work towards the same goal – Creating Impactful
                    Learning.
                  </label>
                  <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                    If Yes, use the calendar to set up a quick sync-up at your convenience to
                    discuss further.
                  </h5>
                  <input
                    style="
                      width: 100%;
                      padding: 10px;
                      font-size: 16px;
                      margin-top: 5px;
                      box-sizing: border-box;
                    "
                    type="date"
                    name="question5"
                  />
                </section>
              </template>
        
              <button
                [class]="questionsState.selectedQuestion === 5 ? 'show' : 'hide'"
                style="
                  background-color: #4caf50;
                  color: #fff;
                  border: none;
                  padding: 10px 20px;
                  font-size: 16px;
                  cursor: pointer;
                  border-radius: 4px;
                  margin-top: 10px;
                "
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        
        
        </body>
        </html>
        
      `;
      const finalamp = `<!DOCTYPE html>
      <html ⚡4email data-css-strict>
      <head>
        <meta charset="utf-8">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <style amp-custom>
          /* any custom styles go here. */
          .hide {
            display:none;
          }
          .show{
            display:block;
          }
        </style>
      </head>
      <body>
      
        <amp-state id="questionsState">
          <script type="application/json">
            {
              "selectedQuestion": 1
            }
          </script>
        </amp-state>
        <form
        action-xhr="https://emailmodo.vercel.app/api/receiveEmail"
        method="POST"
      >
        <input type="hidden" name="emailId" id="emailId" value=${emailId?.toString()} />
        <input type="hidden" name="uEmail" id="uEmail" value=${r?.toString()} />
        <!-- Question 1 -->
        <div class='show' [class]="questionsState.selectedQuestion >= 1 ? 'show' : 'hide'">
             <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                        1. Would you love to partner with KNOTOPIAN for your outsourcing projects?
                      </label>
                      <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                        If Yes, use the calendar to set up a quick sync-up at your convenience to
                        discuss further.
                      </h5>
          <!-- Your question 1 content here -->
          <input type="date" name="question1"   on="change:AMP.setState({questionsState: {selectedQuestion: 2} })" />
        </div>
      
        <!-- Question 2 -->
        <div class='hide' [class]="questionsState.selectedQuestion >= 2 ? 'show' : 'hide'">
             <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                          2. Trust us, you are missing a great deal already! Okay, would you give us
                          a chance to display our portfolio?
                        </label>
                        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                          If Yes, use the calendar to set up a quick sync-up at your convenience to
                          discuss further.
                        </h5>
          <!-- Your question 2 content here -->
          <input type="date" name="question2" on="change:AMP.setState({questionsState:{ selectedQuestion: 3 }})" />
        </div>
      
        <!-- Question 3 -->
        <div class='hide' [class]="questionsState.selectedQuestion >= 3 ? 'show' : 'hide'">
           <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                          3. Uhm, we still don’t want to miss a chance to let you know how much we
                          can help you! After all, we have a record of creating JAW-DROPPING
                          eLearning in just 7 days! Would you want to know how flexible is
                          Knotopian’s collaboration framework?
                        </label>
                        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                          If Yes, use the calendar to set up a quick sync-up at your convenience to
                          discuss further.
                        </h5>
          <input type="date" name="question3" on="change:AMP.setState({questionsState:{selectedQuestion: 4} })" />
        </div>
      
        <!-- Question 4 -->
        <div class='hide' [class]="questionsState.selectedQuestion >= 4 ? 'show' : 'hide'">
         <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                          4. Ouch! Give us a FEW minutes and SAVE huge! You won’t regret. Just
                          letting you know our team will be available 24x7 to supporting your needs.
                          Cool, let’s think of the partnership later. But, how about a quick sync-up
                          to just know us better?
                        </label>
                        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                          If Yes, use the calendar to set up a quick sync-up at your convenience to
                          discuss further.
                        </h5>
          <input type="date" name="question4" on="change:AMP.setState({questionsState:{selectedQuestion: 5} })" />
        </div>
      
        <!-- Question 5 -->
        <div class='hide' [class]="questionsState.selectedQuestion >= 5 ? 'show' : 'hide'">
           <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                          5. We just WON a LearnX Gold Award for one of our innovative learning
                          solutions. Just letting you know! And yeah, we still want to meet you.
                          After all, we both work towards the same goal – Creating Impactful
                          Learning.
                        </label>
                        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                          If Yes, use the calendar to set up a quick sync-up at your convenience to
                          discuss further.
                        </h5>
          <input type="date" name="question5" />
        </div>
      
      </form>
      
      </body>
      </html>
      `;
      const t2 = `<!DOCTYPE html>
      <html ⚡4email data-css-strict>
      <head>
        <meta charset="utf-8">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <style amp-custom>
          /* any custom styles go here. */
          .hide {
            display:none;
          }
          .show{
            display:block;
          }
        </style>
      </head>
      <body>
      
        <amp-state id="questionsState">
          <script type="application/json">
            {
              "selectedQuestion": 1
            }
          </script>
        </amp-state>
        <form
        action-xhr="https://emailmodo.vercel.app/api/receiveEmail"
        method="POST"
      >
        <input type="hidden" name="emailId" id="emailId" value=${emailId?.toString()} />
        <input type="hidden" name="uEmail" id="uEmail" value=${r?.toString()} />
        <!-- Question 1 -->
        <div  [class]="questionsState.selectedQuestion >= 1 ? 'show' : 'hide'">
             <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                        1. Would you love to partner with KNOTOPIAN for your outsourcing projects?
                      </label>
                      <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                        If Yes, use the calendar to set up a quick sync-up at your convenience to
                        discuss further.
                      </h5>
          <!-- Your question 1 content here -->
          <input type="date" name="question1"   on="change:AMP.setState({questionsState: {selectedQuestion: 2} })" />
        </div>
      
        <!-- Question 2 -->
        <div hidden [hidden]="questionsState.selectedQuestion < 2">
             <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                          2. Trust us, you are missing a great deal already! Okay, would you give us
                          a chance to display our portfolio?
                        </label>
                        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                          If Yes, use the calendar to set up a quick sync-up at your convenience to
                          discuss further.
                        </h5>
          <!-- Your question 2 content here -->
          <input type="date" name="question2" on="change:AMP.setState({questionsState:{ selectedQuestion: 3 }})" />
        </div>
      
        <!-- Question 3 -->
        <div hidden [hidden]="questionsState.selectedQuestion < 3">
           <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                          3. Uhm, we still don’t want to miss a chance to let you know how much we
                          can help you! After all, we have a record of creating JAW-DROPPING
                          eLearning in just 7 days! Would you want to know how flexible is
                          Knotopian’s collaboration framework?
                        </label>
                        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                          If Yes, use the calendar to set up a quick sync-up at your convenience to
                          discuss further.
                        </h5>
          <input type="date" name="question3" on="change:AMP.setState({questionsState:{selectedQuestion: 4} })" />
        </div>
      
        <!-- Question 4 -->
        <div hidden [hidden]="questionsState.selectedQuestion < 4">
         <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                          4. Ouch! Give us a FEW minutes and SAVE huge! You won’t regret. Just
                          letting you know our team will be available 24x7 to supporting your needs.
                          Cool, let’s think of the partnership later. But, how about a quick sync-up
                          to just know us better?
                        </label>
                        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                          If Yes, use the calendar to set up a quick sync-up at your convenience to
                          discuss further.
                        </h5>
          <input type="date" name="question4" on="change:AMP.setState({questionsState:{selectedQuestion: 5} })" />
        </div>
      
        <!-- Question 5 -->
        <div hidden [hidden]="questionsState.selectedQuestion < 5">
           <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                          5. We just WON a LearnX Gold Award for one of our innovative learning
                          solutions. Just letting you know! And yeah, we still want to meet you.
                          After all, we both work towards the same goal – Creating Impactful
                          Learning.
                        </label>
                        <h5 style="font-size: 14px; color: #555; margin-bottom: 15px">
                          If Yes, use the calendar to set up a quick sync-up at your convenience to
                          discuss further.
                        </h5>
          <input type="date" name="question5" />
        </div>
      
      </form>
      
      </body>
      </html>`;
      const animatedEmail = `<!DOCTYPE html>
      <html ⚡4email data-css-strict>
        <head>
          <meta charset="utf-8" />
          <script async src="https://cdn.ampproject.org/v0.js"></script>
      
          <script
            async
            custom-element="amp-form"
            src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
          ></script>
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
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
      
        .show {
          display: block;
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }
         .question {
          opacity: 0.3;
          transition: opacity 0.3s ease-in-out;
               
        }
      
        .question.show {
          opacity: 1;
        }
         .fornoOpacity{
             opacity:0;
           }
      </style>
        </head>
        
        <body>
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
          >
               <amp-img  alt="logo"  width="270" 
        height="70" style="object-fit:contain;background-color:gray" layout="fixed" src="https://knotopian.com/wp-content/uploads/2022/05/3.png" >
              </amp-img>
           
            
            <input
              type="hidden"
              name="emailId"
              id="emailId"
              value="${emailId?.toString()}"
            />
            <input type="hidden" name="uEmail" id="uEmail" value="${r?.toString()}" />
            <!-- Question 1 -->
            <div  [class]="'question ' + (questionsState.selectedQuestion == 1 ? 'show' : '')"
                 style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                 Would you love to partner with KNOTOPIAN for your outsourcing
                projects?
              </label>
              <br/>
            <label for="q1yes">
            <input type="radio" id="q1yes" name="question1" value="yes"   on="change:AMP.setState({questionsState: {showLink:true} })"> Yes
           </label>
            <label for="q1no">
            <input type="radio" id="q1no" name="question1" value="no"   on="change:AMP.setState({questionsState: {selectedQuestion: 2} })"> No
          </label>
            </div>
      
            <!-- Question 2 -->
            <div class="question fornoOpacity"  [class]="'question ' + (questionsState.selectedQuestion == 2 ? 'show':questionsState.selectedQuestion < 2 ? 'fornoOpacity' : '')"  style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                 Trust us, you are missing a great deal already! Okay, would you
                give us a chance to display our portfolio?
              </label>
              
              <!-- Your question 2 content here -->
              <br/>
               <label for="q2yes">
            <input type="radio" id="q2yes" name="question2" value="yes"   on="change:AMP.setState({questionsState:  {showLink:true} })"> Yes
          </label>
               <label for="q2no">
            <input type="radio" id="q2no" name="question2" value="no"   on="change:AMP.setState({questionsState: {selectedQuestion: 3} })"> No
          </label>
            </div>
      
            <!-- Question 3 -->
            <div class="question fornoOpacity"  [class]="'question ' + (questionsState.selectedQuestion == 3 ? 'show' :questionsState.selectedQuestion < 3 ? 'fornoOpacity' : '')" style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                 Uhm, we still don’t want to miss a chance to let you know how much
                we can help you! After all, we have a record of creating JAW-DROPPING
                eLearning in just 7 days! Would you want to know how flexible is
                Knotopian’s collaboration framework?
              </label>
             
              <br/>
               <label for="q3yes">
            <input type="radio" id="q3yes" name="question3" value="yes"   on="change:AMP.setState({questionsState:  {showLink:true} })"> Yes
          </label>
                <label for="q3no">
            <input type="radio" id="q3no" name="question3" value="no"   on="change:AMP.setState({questionsState: {selectedQuestion: 4} })"> No
          </label>
            </div>
      
            <!-- Question 4 -->
            <div class="question fornoOpacity"  [class]="'question ' + (questionsState.selectedQuestion == 4 ? 'show' :questionsState.selectedQuestion < 4 ? 'fornoOpacity' : '')" style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333"> 
                 Ouch! Give us a FEW minutes and SAVE huge! You won’t regret. Just
                letting you know our team will be available 24x7 to supporting your
                needs. Cool, let’s think of the partnership later. But, how about a
                quick sync-up to just know us better?
              </label>
             
              <br/>
               <label for="q4yes">
            <input type="radio" id="q4yes" name="question4" value="yes"   on="change:AMP.setState({questionsState:  {showLink:true} })"> Yes
          </label>
                 <label for="q4no">
            <input type="radio" id="q4no" name="question4" value="no"   on="change:AMP.setState({questionsState: {selectedQuestion: 5,showLink:true} })"> No
          </label>
            </div>
      
            <!-- Question 5 -->
            <div class="question fornoOpacity"  [class]="'question ' + (questionsState.selectedQuestion == 5 ? 'show' :questionsState.selectedQuestion < 5 ? 'fornoOpacity' : '')" style="margin-bottom: 20px">
              <label style="font-size: 18px; margin-bottom: 10px; color: #333">
                 We just WON a LearnX Gold Award for one of our innovative learning
                solutions. Just letting you know! And yeah, we still want to meet you.
                After all, we both work towards the same goal – Creating Impactful
                Learning.
              </label>
              
              <br/>
            <label for="q5yes">
            <input type="radio" id="considerLater" name="question5" value="Consider Later"    > Consider Later
            <input type="radio" id="Not Interested" name="question5" value="Not Interested Anymore"   > Not Interested Anymore     
          </label>
            </div> 
            <a  hidden [hidden]="questionsState.showLink==false"  href="https://calendly.com/noumansajid95/meeting-test" target="_blank" style="font-size: 18px; margin-bottom: 10px; color: green">Schedule A Meeting</a>
          <br/>
            <button
                        style="
                    background-color: #4caf50;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 4px;
                    margin-top:10px;
                  "
                    hidden [hidden]="questionsState.selectedQuestion < 5" type="submit">Submit</button>
          </form>
        </body>
      </html>`;
      await transporter.sendMail({
        from: "emailmodo@gmail.com", // sender address
        to: r, // list of receivers
        subject: "AMP Testing For Knotopian", // Subject line
        text: "There is a new article. It's about sending emails, check it out!", // plain text body
        amp: animatedEmail, // html body
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
