"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik, FormikProvider, Field, ErrorMessage, Form } from "formik";
import { MailXIcon } from "lucide-react";
import { toast } from "react-toastify";
const validationSchema = yup.object().shape({
  // receivers: yup.array().min(1, "Enter Atleast One Email").of(yup.string()),
  subject: yup.string().required("Subject is Required"),
  message: yup.string().min(10),
});
function EmailForm() {
  const [emailInput, setEmailInput] = useState<string>("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const formikObj = useFormik({
    validationSchema,
    initialValues: {
      // receivers: emailList,
      subject: "",
      message: "",
    },
    async onSubmit(values, formikHelpers) {
      // if (emailList.length <= 0) {
      //   toast.error("Enter Receiver Email");
      //   return;
      // }
      console.log(values);
      await sendEmail(values.subject, values.message);
    },
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target?.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const trimmedEmail = emailInput.trim();

    if (trimmedEmail && isValidEmail(trimmedEmail)) {
      setEmailList([...emailList, trimmedEmail]);
      setEmailInput("");
    }
  };

  const removeEmail = (index: number) => {
    const updatedEmailList = [...emailList];
    updatedEmailList.splice(index, 1);
    setEmailList(updatedEmailList);
  };

  const isValidEmail = (email: string) => {
    // You can implement more sophisticated email validation if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const sendEmail = async (subject: string, text: string) => {
    try {
      await fetch("http://localhost:3000/api/sendEmail", {
        method:"POST",
        body: JSON.stringify({
          subject,
          text,
        }),
      });
    } catch (e: any) {
      return toast.error(e);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    console.log("Called");
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      console.log("here");
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const emailsFromFile = content
          ?.split("\n")
          .map((email: string) => email.trim());

        setEmailList([...emailList, ...emailsFromFile]);
      };
      console.log("here");

      reader.readAsText(file);
    }
  };
  return (
    <FormikProvider value={formikObj}>
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="space-y-4 border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Compose Email
            </h3>
            <h3>Import Email List</h3>
            <input
              placeholder="Import Emails"
              type="file"
              accept=".txt"
              onChange={(e) => handleFileChange(e)}
              className="w-full  rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
            />
          </div>

          <form onSubmit={formikObj.handleSubmit}>
            <div className="space-y-5 p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email <span className="text-meta-1">*</span>
                </label>

                <div className="flex flex-wrap items-center space-y-5 overflow-auto">
                  <div className="flex max-h-25 w-full flex-wrap">
                    {emailList.map((email, index) => (
                      <div key={index} className="mb-2 mr-2 flex items-center">
                        <span className="rounded-l bg-primary px-2 py-1 text-white">
                          {index + 1}
                        </span>
                        <span className="rounded-r bg-body px-2 py-1 text-white">
                          {email}
                        </span>
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={() => removeEmail(index)}
                        >
                          <MailXIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <input
                type="text"
                placeholder="Enter email addresses"
                value={emailInput}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleInputKeyDown(e)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subject
                </label>
                <Field
                  name="subject"
                  type="text"
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <ErrorMessage
                  name="subject"
                  component={"h2"}
                  className="text-red-500"
                />
              </div>
              {/* 
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subject
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Type your subject</option>
                    <option value="">USA</option>
                    <option value="">UK</option>
                    <option value="">Canada</option>
                  </select>
                  <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div> */}

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Message
                </label>
                <Field
                  as="textarea"
                  name="message"
                  rows={6}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <ErrorMessage
                  name="message"
                  component={"h2"}
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="my-3 block text-black dark:text-white">
                  Attach files
                </label>
                <input
                  type="file"
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>
              <button
                className="my-3 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}

export default EmailForm;
