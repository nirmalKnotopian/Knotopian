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
interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar((state) => state);
  const { setisloggedinFalse, setuserAuth } = useAuthStore();
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
        {/* <Link className="flex items-center" href="/"> */}
        <Image
          className="h-6 w-6 rounded-md"
          width={400}
          height={400}
          src={"/images/logo/logo-icon.png"}
          alt="Logo"
        />
        {isSidebarOpen && (
          <h1 className=" ml-2 text-xl font-semibold text-white">MailMode</h1>
        )}
        {/* </Link> */}
        {isSidebarOpen && (
          <MenuIcon onClick={toggleSidebar} className="h-6 w-6" />
        )}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4  lg:px-6">
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
                  icon={<Mail className="h-6 w-6" />}
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

              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Ui Elements --> */}

              {/* <!-- Dropdown Menu Start --> */}
              {/* <li>
                <ExpandMenu icon={<Component className="h-6 w-6" />} name="UI">
                  <LinkItem
                    title="Alerts"
                    href="/ui/alerts"
                    icon={<AlertCircle className="h-5 w-5" />}
                  ></LinkItem>
                  <LinkItem
                    title="Buttons"
                    href="/ui/buttons"
                    icon={<MousePointerClick className="h-5 w-5" />}
                  />
                </ExpandMenu>
              </li> */}

              {/* <!-- Menu Item Ui Elements --> */}

              {/* <!-- Menu Item Auth Pages --> */}
              {/* <li>
                <ExpandMenu name="Auth" icon={<LampIcon className="h-6 w-6" />}>
                  <LinkItem
                    title="Sign In"
                    href="/auth/signin"
                    icon={<LockIcon className="h-5 w-5" />}
                  ></LinkItem>
                  <LinkItem
                    title="Sign up"
                    href="/auth/signup"
                    icon={<SignalHigh className="h-5 w-5" />}
                  ></LinkItem>
                </ExpandMenu>
              </li> */}

              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
