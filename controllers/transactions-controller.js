/*
 * Get all the Transactions
 */
export function getTransactions(req, res, next) {
  res.send("GET transactions");
}
/*
 * Add a Transaction
 */
export function addTransactions(req, res, next) {
  res.send("Add transactions");
}
/*
 * Delete a Transaction
 */
export function deleteTransactions(req, res, next) {
  res.send("Delete transactions");
}
