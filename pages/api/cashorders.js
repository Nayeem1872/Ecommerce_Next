
import { CashOnDelivery } from "@/lib/models/CashOnDelivery";
import { mongooseConnect } from "@/lib/mongoose";



export default async function handler(req,res){
    await mongooseConnect();
    res.json(await CashOnDelivery.find().sort({createdAt:-1}))
}