import Transaction from "../models/Transaction.js";

/*
 * Get all the Transactions
 */
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
/*
 * Add a Transaction
 */
export const addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);
    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.error(err);
  }
};
/*
 * Delete a Transaction
 */
export function deleteTransactions(req, res, next) {
  res.send("Delete transactions");
}
