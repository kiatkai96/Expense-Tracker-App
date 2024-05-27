import styled from "styled-components";
import { useState, useEffect } from "react";
import OverViewComponent from "../../overview";
import TransactionComponent from "./transaction";

// Using the div from the styled-components and style the div accordingly
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  font-family: Poppins;
  width: 360px;
`;

const HomeComponent = () => {
  // Create transactions state here where it will be initally empty and passed onto the TransactionComponent below
  const [transactions, updateTransaction] = useState([]);
  //   Create initial state for expense and income and set their default to 0
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  // Define a method to add Transaction here
  const addTransaction = (payload) => {
    // Get the existing transaction
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    updateTransaction(transactionArray);
  };

  //   Create a method to calculate balance
  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) => {
      // If it is a type of expense, then add the amount to expense else add to income
      payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount);
    });
    // Update the expense state here
    updateExpense(exp);
    // Update the income state here
    updateIncome(inc);
  };

  useEffect(() => calculateBalance(), [transactions]);

  return (
    <Container>
      {/* We iomport the overview component to be used into the home component */}
      <OverViewComponent
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      {/* We iomport the transaction component to be used into the home component */}
      <TransactionComponent transactions={transactions} />
    </Container>
  );
};

export default HomeComponent;
