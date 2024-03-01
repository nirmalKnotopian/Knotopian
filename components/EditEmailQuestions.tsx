"use client";
import { Field, ErrorMessage, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
//@ts-ignore
import { db, storage } from "../firebase.js";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import { LoaderIcon } from "react-hot-toast";
const validationSchema = yup.object().shape({
  questions: yup.array().of(yup.string().required("Question Can Not Be Empty")),
});
const EditEmailQuestions = () => {
  const [isloading, setisloading] = useState<boolean>(true);
  const [reload, setreload] = useState<boolean>(false);
  const [shouldUpdate, setshouldUpdate] = useState<boolean>(false);
  const [Emailquestions, setEmailquestions] = useState<string[]>();
  const formikobj = useFormik({
    enableReinitialize: true,
    initialValues: {
      questions: Emailquestions || [""],
    },
    validationSchema,
    async onSubmit(values, formikHelpers) {
      try {
        console.log(values);
        setisloading(true);

        await updateDoc(doc(db, "emailquestions", "z8TggwoJcPiyqmKtw3dp"), {
          questions: values.questions,
        });
        setreload(true);
        toast.success("Success");
      } catch (e) {
        console.log(e);

        toast.error("An Error Occured");
      } finally {
        setisloading(false);
      }
    },
  });
  useEffect(() => {
    getQuestions();
  }, [reload]);
  const getQuestions = useCallback(async () => {
    try {
      setisloading(true);
      const cats = await getDocs(collection(db, "emailquestions"));
      const catarray: string[] = [];
      if (!cats.empty) {
        catarray.push(...(cats.docs[0].data()?.questions as string[]));
      }
      setEmailquestions(catarray!);
    } catch (e) {
      toast.error(
        "Couldnt Fetch Settings , Either They Dont Exist or Your Internet Connection isnt Working",
      );
    } finally {
      setisloading(false);
      setreload(false);
    }
  }, []);
  if (isloading) return <LoaderIcon className="mx-auto h-30 w-30" />;
  return (
    <FormikProvider value={formikobj}>
      <form onSubmit={formikobj.handleSubmit}>
        <h1>Edit Email Questions</h1>
        {formikobj.values.questions.map((d, index) => (
          <div
            className="my-3 flex w-full flex-col lg:flex-row lg:space-x-5 "
            key={index}
          >
            <div className="w-full md:w-2/5 ">
              <label className="mb-3 block text-black dark:text-white">
                Question {index + 1}
              </label>
              <Field
                as="textarea"
                type="text"
                name={`questions.${index}`}
                placeholder="Question Text"
                className="h-42.5 w-full rounded-lg border-[1.5px] border-stroke bg-transparent bg-white px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <ErrorMessage
                name={`questions.${index}`}
                component="div"
                className="text-danger"
              />
            </div>

            <div className="flex w-20 items-end pb-2">
              {index > 0 && (
                <svg
                  fill="#ff0000"
                  height={20}
                  width={20}
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ff0000"
                  className="cursor-pointer"
                  onClick={() => {
                    formikobj.setFieldValue("questions", [
                      ...formikobj.values.questions.slice(0, -1),
                    ]);
                  }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>cancel</title>{" "}
                    <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path>{" "}
                  </g>
                </svg>
              )}
            </div>
          </div>
        ))}
        <div className="relative my-8 -ml-5 w-3/5">
          <svg
            viewBox="0 0 1024 1024"
            height={30}
            width={30}
            version="1.1"
            className="icon absolute right-0 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            onClick={() => {
              formikobj.setFieldValue("questions", [
                ...formikobj.values.questions,
                "",
              ]);
            }}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z"
                fill="#00ff2a"
              ></path>
              <path
                d="M682.7 554.7H341.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h341.3c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.6 42.7z"
                fill="#00ff1e"
              ></path>
              <path
                d="M512 725.3c-23.6 0-42.7-19.1-42.7-42.7V341.3c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v341.3c0 23.6-19.1 42.7-42.7 42.7z"
                fill="#00ff1e"
              ></path>
            </g>
          </svg>
        </div>

        <button
          type="submit"
          disabled={!!isloading}
          className="my-20 inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          {isloading ? (
            <LoaderIcon className="h-8 w-8" />
          ) : shouldUpdate ? (
            "Update"
          ) : (
            "Save"
          )}
        </button>
      </form>
    </FormikProvider>
  );
};

export default EditEmailQuestions;
