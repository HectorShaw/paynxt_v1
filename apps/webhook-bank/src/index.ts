import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    

    const paymentInformation: {
        token: string;
        userId: number;
        amount: number;
    } = {
        token: req.body.token,
        userId: parseInt(req.body.user_identifier, 10), 
        amount: parseFloat(req.body.amount)
    };


    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        });
    } catch(e) {
        console.error(e);
        if (e) {
            res.status(500).json({
                message: "Database transaction failed"
            });
        } else {
            res.status(500).json({
                message: "Error while processing webhook"
            });
        }
    }

})

app.listen(3003);
