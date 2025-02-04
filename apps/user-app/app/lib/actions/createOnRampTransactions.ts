"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  // next auth will give acccess to the userId instead of giving directly the userId
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();
  //technically we should get this from a bank api

  await prisma.onRampTransaction.create({
    data: {
      token: token,
      provider,
      status: "Processing",
      startTime: new Date(),
      userId: Number(session?.user?.id),
      amount: amount * 100,
    },
  });

  return {
    message: "Done",
  };
}
