import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LineChartIcon,
  MenuIcon,
  ShoppingBag,
  AreaChart,
  Calendar,
  User2Icon,
  LockIcon,
  BarChart2,
  Component,
  Settings,
  Table2Icon,
  FormInputIcon,
  HomeIcon,
  LampIcon,
  SignalHigh,
  AlertCircle,
  SwissFranc,
  MousePointerClick,
  LogOutIcon,
  Mail,
  MailPlusIcon,
  MailQuestion,
  SidebarOpen,
} from "lucide-react";
import { useSidebar } from "./use-sidebar";
import { cn } from "@/app/libs/utlis";
import MenuItem from "./MenuItem";
import LinkItem from "./LinkItem";
import ExpandMenu from "./ExpandMenu";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "react-toastify";
import useAuthStore from "@/store/userAuth";
import useColorMode from "@/hooks/useColorMode";
interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar((state) => state);
  const { setisloggedinFalse, setuserAuth } = useAuthStore();
  const [colormode, setColorMode] = useColorMode();
  const signout = useCallback(async () => {
    try {
      await signOut(auth);
      setisloggedinFalse();
      setuserAuth({ email: "", id: "", isloggedin: false, name: "" });
      toast.success("Signed Out");
    } catch (e) {
      toast.success("Failed to Signed Out");
    }
  }, []);
  console.log("Colormode", isSidebarOpen);
  return (
    <aside
      className={cn(
        `absolute left-0 top-0 z-9999 flex h-screen w-20 flex-col overflow-y-hidden bg-black duration-300 ease-linear  dark:bg-boxdark lg:static lg:translate-x-0 `,
        {
          "w-70": isSidebarOpen,
        },
      )}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="relative flex w-full items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link className="flex items-center" href="/">
          <Image
            className="h-6 w-28 rounded-md object-contain"
            width={400}
            height={400}
            src={"/images/logo/CLogo.png"}
            alt="Logo"
          />
        </Link>
        {isSidebarOpen && (
          <MenuIcon
            onClick={toggleSidebar}
            className={`h-6 w-6 cursor-pointer  ${isSidebarOpen ? "text-white" : "text-orange-950"}`}
            color={isSidebarOpen ? "white" : "black"}
            fill={isSidebarOpen ? "white" : "black"}
          />
        )}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div
        className={`no-scrollbar flex h-full flex-col items-start justify-between overflow-y-auto duration-300 ease-linear ${isSidebarOpen ? "" : ""}`}
      >
        {/* <!-- Sidebar Menu --> */}
        <nav
          className={`px-4 py-4  lg:px-6  ${!isSidebarOpen ? "px-0 lg:px-0" : ""}`}
        >
          {/* <!-- Menu Group --> */}
          <div>
            <ul
              className={cn("mb-6 flex flex-col  gap-1.5", {
                "items-center justify-center": !isSidebarOpen,
              })}
            >
              {/* <!-- Menu Item Dashboard --> */}
              {/* <li>
                <ExpandMenu
                  name="Homepage"
                  icon={<HomeIcon className="  h-6 w-6 hover:text-white" />}
                >
                  <LinkItem
                    icon={<ShoppingBag />}
                    title="E-commerce"
                    href="/"
                  />
                </ExpandMenu>
              </li> */}
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <LinkItem
                  title="Compose Email"
                  href="/compose"
                  icon={<MailPlusIcon className="h-6 w-6" />}
                ></LinkItem>
              </li>
              <li>
                <LinkItem
                  title="Email Responses"
                  href="/emailResponse"
                  icon={<Mail className="h-6 w-6" />}
                ></LinkItem>
              </li>
              <li>
                <LinkItem
                  title="Edit Email Questions"
                  href="/EditDynamicEmail"
                  icon={<MailQuestion className="h-6 w-6" />}
                ></LinkItem>
              </li>
              {/* <!-- Menu Item Calendar --> */}
              {/* <li>
                <LinkItem
                  title="Calendar"
                  href="/calendar"
                  icon={<Calendar className="h-6 w-6" />}
                ></LinkItem>
              </li> */}

              {/* <li>
                <LinkItem
                  title="Tables"
                  href="/tables"
                  icon={<Table2Icon className="h-6 w-6" />}
                ></LinkItem>
              </li> */}

              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              {/* <li>
                <LinkItem
                  title="Settings"
                  href="/settings"
                  icon={<Settings className="h-6 w-6" />}
                ></LinkItem>
              </li> */}

              {/* <!-- Menu Item Settings --> */}
              {/* <li>
                <LinkItem
                  title="Profile"
                  href="/profile"
                  icon={<User2Icon className="h-6 w-6" />}
                ></LinkItem>
              </li> */}

              {/* <!-- Menu Item Chart --> */}
              {/* <li>
                <LinkItem
                  title="Charts"
                  href="/chart"
                  icon={<BarChart2 className="h-6 w-6" />}
                ></LinkItem>
              </li> */}
              <li
                className={`group relative flex cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 font-medium text-white  duration-300 ease-in-out  dark:hover:text-white `}
                onClick={signout}
              >
                <LogOutIcon />
                Sign Out
              </li>
            </ul>
          </div>
        </nav>
        <div className="flex w-full justify-center py-6">
          <h1 className="text-center"> Powered By Iris Ai Innovations</h1>
        </div>

        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
