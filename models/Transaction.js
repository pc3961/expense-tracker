import mongoose from "mongoose";
/*
* Created a new Database Schema
*/
const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        true: true,
        required: [true, 'Please add some text'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number'],
        min: [1, 'Amount must be greater than or equal to 1'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
