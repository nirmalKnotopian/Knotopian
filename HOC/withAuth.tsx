"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter, redirect } from "next/navigation";
import useAuthStore from "@/store/userAuth";
import Loader from "@/components/common/Loader";
function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const {
      setisloggedinTrue,
      user: { isloggedin, ...u },
      setuserAuth,
      setisloggedinFalse,
    } = useAuthStore();
    const router = useRouter();
    console.log("Here");
    if (!isloggedin) {
      return (
        <div className="w-full">
          <Loader />
        </div>
      );
    }
    return <Component {...props} />;
  };
}

export default withAuth;
