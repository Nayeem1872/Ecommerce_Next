const { Schema, model, models } = require("mongoose");


const OrderSchema = new Schema({
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

export const Order = models?.Order || model('Order', OrderSchema);