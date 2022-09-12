import {db} from "../database/db.js";

export async function transactionProfile(req, res) {
    try {
        const arrayAllBalance = await db.collection('balance').find().toArray();

        return res.send(arrayAllBalance)
    }catch(err){
        return res.status(500).send(err.message);
    }
  }
 
export async function newTransaction(req, res) {
    try {
        const { value, description, email }= req.body;
        
        const date = dayjs(new Date()).format("DD/MM");
        const user = await db.collection("account").findOne({ email });
    
        await db.collection("balance").insertOne({ ...req.body, date });


        return res.send('ok')
    }catch{
        return res.status(500)
    }
}