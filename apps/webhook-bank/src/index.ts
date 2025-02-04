import express from "express";
import db from "@repo/db/client";
const app = express();

app.post("/Xwebhook", async (req, res) => {
  const paymentInfo = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  await db.balance.update({
    where: {
      userId: paymentInfo.userId,
    },
    data: {
      amount: {
        increment: paymentInfo.amount,
      },
    },
  });

  await db.onRampTransaction.update({
    where: {
      token: paymentInfo.token,
    },

    data: {
      status: "Success",
    },
  });
  res.status(200).json({ message: "captured" });
});
