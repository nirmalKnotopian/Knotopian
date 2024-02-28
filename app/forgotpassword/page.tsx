"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import ButtonLoader from "@/components/ButtonLoader";
import { toast } from "react-toastify";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/userAuth";
import { doc, getDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [loading, setisloading] = useState<boolean>(false);
  const {
    user: { isloggedin },
    setuserAuth,
  } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (isloggedin) return router.replace("/");
  }, []);
  const navigateToSignin = useCallback(async () => {
    router.push("/auth/signin");
  }, []);
  const submitform = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setisloading(true);
        await sendPasswordResetEmail(auth, emailRef.current?.value!);
        toast.info("Password Reset Email Sent.");
      } catch (e) {
        console.log(e);
        toast.error("Couldnt Continue");
      } finally {
        setisloading(false);
      }
    },
    [emailRef],
  );
  console.log("logg", isloggedin);
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              {/* <Link className="mb-5.5 inline-block" href="/"> */}
              <h1 className="text-2xl font-semibold text-white">Chatlet</h1>
              <Image
                className="dark:hidden"
                src={"/images/logo/CLogo.png"}
                alt="Logo"
                width={300}
                height={32}
              />
              {/* </Link> */}
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium"></span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Enter Your Email To Reset Your Password
              </h2>
              <form onSubmit={submitform}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      ref={emailRef}
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    className=" inline-flex w-full items-center justify-center rounded-sm bg-blue-500 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    disabled={!!loading}
                  >
                    {loading ? <ButtonLoader /> : "Reset Password"}
                  </button>
                </div>
                <h1
                  className="mt-6 cursor-pointer text-center text-blue-400"
                  onClick={navigateToSignin}
                >
                  Go Back To SignIn
                </h1>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
