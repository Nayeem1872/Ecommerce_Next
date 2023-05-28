const { Schema, model, models } = require("mongoose");

const CashOnDeliverySchema = new Schema({
    line_items:Object,
    name:String,
    email:String,
    city:String,
    postalCode:String,
    address:String,
    mobile:Number,
    paid:Boolean,
},{
    timestamps:true,
});

export const CashOnDelivery = models?.CashOnDelivery || model ("CashOnDelivery" ,CashOnDeliverySchema)
