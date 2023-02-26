import React, { CSSProperties } from "react";
import { CircleLoader, RingLoader } from "react-spinners";
import BounceLoader from "react-spinners/BounceLoader";
import PuffLoader from "react-spinners/PuffLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
  color: "blue",
};

export default function Loading({ size }: { size: number }) {
  return (
    <PuffLoader color="#1c4e80" cssOverride={override} size={size || 60} />
  );
}
