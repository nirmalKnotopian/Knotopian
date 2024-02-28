import React from "react";

function TrackingCard({
  title,
  color,
  value,
}: {
  title: string;
  color?: string;
  value: string;
}) {
  return (
    <div
      className={`h-56 w-75 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-md ${color}`}
    >
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <h2 className="mb-2 text-xl font-semibold">{value}</h2>
    </div>
  );
}

export default TrackingCard;
