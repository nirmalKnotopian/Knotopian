"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AreaChart, SimpleBar, SimpleDonut } from "@/components/Charts";
import withAuth from "@/HOC/withAuth";
const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />
      <div className="space-y-5">
        <SimpleBar />
        <AreaChart />
        <SimpleDonut />
      </div>
    </>
  );
};

export default withAuth(Chart);
