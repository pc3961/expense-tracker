import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  transactions: [],
  errors: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

// Provider Component

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // GET Transactions
  async function getTransactions() {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/transactions");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response ? err.response.data.error : "Network error",
      });
    }
  }

  // Delete Transaction
  async function deleteTransaction(id) {
    try {
      await axios.delete(`http://localhost:5000/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response ? err.response.data.error : "Network error",
      });
    }
  }
  // Add Transaction
  async function addTransaction(transaction) {
    const config = {
      headers:{
        "Content-Type": "application/json",
      }
    }
    try {
      const res = await axios.post('http://localhost:5000/api/v1/transactions/', transaction, config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response ? err.response.data.error : "Network error",
      });
    }
    
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        errors: state.errors,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
