"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect, useLayoutEffect } from "react";
import Loader from "@/components/common/Loader";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header";
import { Suspense } from "react";
import CheckAuth from "@/HOC/checkAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import useAuthStore from "@/store/userAuth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const {
    setisloggedinTrue,
    user: { isloggedin, ...u },
    setuserAuth,
    setisloggedinFalse,
  } = useAuthStore();
  const path = usePathname();
  const protectedPaths = ["/emailResponse", "/EditDynamicEmail", "/compose"];
  const router = useRouter();
  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      try {
        console.log("run");
        if (user) {
          console.log("Logged In");
          setuserAuth({
            id: user.uid || "",
            email: user.email! || "",
            isloggedin: true,
            name: user.displayName! || "",
          });
          setisloggedinTrue();
        } else {
          setisloggedinFalse();
          router.replace("/auth/signin");
        }
      } catch (e) {
        console.log("e", e);
      } finally {
        setLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    if (isloggedin === undefined) return;
    if (!isloggedin) {
      console.log("logged in val", isloggedin);
      console.log("Current Path", path);
      const a = protectedPaths.some((p) => p === path);
      if (a) {
        console.log("router true");
        router.replace("/auth/signin");
      }
    }
  }, [isloggedin]);

  return (
    <html lang="en">
      <body className="w-full dark:bg-black">
        <Suspense
          fallback={
            <div className="dark:bg-black">
              <Loader />
            </div>
          }
        >
          <div className="w-full dark:bg-black dark:text-bodydark">
            <ToastContainer position="top-right" />
            {loading ? (
              <div className="w-full dark:bg-black ">
                <Loader />
              </div>
            ) : (
              <>
                <div className="flex h-screen overflow-hidden">
                  {/* <!-- ===== Content Area Start ===== --> */}
                  {!isloggedin ? (
                    <main className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                      </div>
                    </main>
                  ) : (
                    <>
                      <Sidebar />
                      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden pl-20 lg:pl-0">
                        {/* <!-- ===== Header Start ===== --> */}
                        <Header
                          sidebarOpen={sidebarOpen}
                          setSidebarOpen={setSidebarOpen}
                        />
                        {/* <!-- ===== Header End ===== --> */}
                        {/* <!-- ===== Sidebar Start ===== --> */}
                        {/* <!-- ===== Sidebar End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main>
                          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                          </div>
                        </main>

                        {/* <!-- ===== Main Content End ===== --> */}
                      </div>
                    </>
                  )}
                  {/* <!-- ===== Content Area End ===== --> */}
                </div>
              </>
            )}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
