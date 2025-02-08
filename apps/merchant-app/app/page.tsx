"use client";

import { useBalance } from "../../../packages/store/src/hooks/useBalance";

export default function () {
  const balance = useBalance();
  return <div> {balance}</div>;
}
