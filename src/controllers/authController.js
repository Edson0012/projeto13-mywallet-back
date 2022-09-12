import {db} from "../database/db.js";
import bcrypt, { hashSync } from 'bcrypt';
import { v4 as uuid} from "uuid";


export async function signUp (req , res){
    try {
        const user = req.body
        const confirmAccount = await db.collection('account').findOne({
            email: user.email
        });

        if(confirmAccount){
            return res.sendStatus(409)
        } 

        const passwordHash = bcrypt.hashSync(user.password, 10)

        await db.collection('account').insertOne({
                name: user.name,
                email: user.email,
                password: passwordHash,
                balance: 0,
        })

        return res.sendStatus(201)
    }catch(err){
        return res.status(500).send(err.message);
    }
}


export async function signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await db.collection("account").findOne({ email });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        const email = user.email;
        const name = user.name;
        const balance = user.balance
        await db.collection("sessions").insertOne({
          email,
          token,
        });

       return res.status(200).send({email, token, name, balance });
      } else {
        return res.status(401).send("Email ou senha incorretos!");
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  