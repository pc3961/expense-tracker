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
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: errors,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
/*
 * Delete a Transaction
 */
export const deleteTransactions = async (req, res, next) => {
  try {
    // Accessing the ID from the request parameters
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
