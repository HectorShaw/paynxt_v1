"use client";

import { useBalance } from "../../../packages/store/src/hooks/useBalance";

export default function () {
  const balance = useBalance();
  return <div>hi there this is merchant side {balance}</div>;
}
