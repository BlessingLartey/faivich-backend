import { Schema, Types, model } from "mongoose";
import normalize from 'normalize-mongoose';

const orderSchema = new Schema({
    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

orderSchema.plugin(normalize);

export const OrderModel = model('Order', orderSchema);
