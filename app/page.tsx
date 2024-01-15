import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import CheckAuth from "@/HOC/checkAuth";
export const metadata: Metadata = {
  title: "ShakibAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
      {/* Home */}
      <CheckAuth>
        <ECommerce />
      </CheckAuth>
    </>
  );
}
