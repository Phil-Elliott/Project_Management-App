import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading({ size }: { size: number }) {
  return <PuffLoader cssOverride={override} size={size || 60} />;
}
