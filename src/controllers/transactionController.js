import {db} from "../database/db.js";
import dayjs from "dayjs"

export async function transactionProfile(req, res) {
    
    try {
        const arrayAllBalance = await db.collection('balance').find().toArray(); 

        return res.status(201).send( arrayAllBalance )
    }catch(err){
        return res.status(500).send(err.message);
    }
  }
 
export async function newTransaction(req, res) {
    try {
        const { value, description, type, email  } = req.body;

        const date = dayjs(new Date()).format("DD/MM");
        const user = await db.collection("account").findOne({ email });

        
         await db.collection("balance").insertOne({ value, description, type, date, email });

        if (type === "exit") {
          const balance = (Number(user.balance) - Number(value)).toFixed(2);

          await db.collection("account").updateOne({ email: email }, { $set: { balance: balance } });
        } else if (type === "entry") {
          const balance = (Number(user.balance) + Number(value)).toFixed(2);

          await db.collection("account").updateOne({ email: email }, { $set: { balance: balance } });
        }  
 
        return res.send('ok')
    }catch(err){
        return res.status(500).send(err)
    }
}