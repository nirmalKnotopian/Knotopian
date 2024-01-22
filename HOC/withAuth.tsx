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

    // useLayoutEffect(() => {
    //   return onAuthStateChanged(auth, async (user) => {
    //     try {
    //       console.log("run");
    //       if (user) {
    //         console.log("Logged In");
    //         setuserAuth({
    //           id: user.uid,
    //           email: user.email!,
    //           isloggedin: true,
    //           name: user.displayName!,
    //         });
    //         setisloggedinTrue();
    //       } else {
    //         setisloggedinFalse();
    //         router.replace("/auth/signin");
    //       }
    //     } catch (e) {
    //       console.log("e", e);
    //     } finally {
    //       //   setLoading(false);
    //     }
    //   });
    // }, []);
    if (!isloggedin) {
      return <Loader />;
    }
    return <Component {...props} />;
  };
}

export default withAuth;
