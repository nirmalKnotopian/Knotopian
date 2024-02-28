export const revalidate = 1000;
import { Metadata } from "next";
import EmailSentCard from "@/components/TrackingCard/EmailSentCard";
import TotalResponses from "@/components/TrackingCard/TotalResponses";
export const metadata: Metadata = {
  title: "Chatlet",
  description: "This is Home Page For Chatlet",
  // other metadata
};

export default function Home() {
  return (
    <section className="flex flex-col space-x-0 space-y-3 lg:flex-row lg:space-x-4 lg:space-y-0">
      <EmailSentCard />
      <TotalResponses />
    </section>
  );
}
