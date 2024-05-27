import styled from "styled-components";
import { useState } from "react";

// Create an expense container to store the expense and income
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;
// Create an expense box to show the expense and income
// & refers to all instances of the component
const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
`;

// Using the div from the styled-components and style the div accordingly
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  font-family: Poppins;
  width: 100%;
`;
// Create a row container for the balance box
const BalanceBox = styled.div`
  font-size: 18px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;
// Create a row container for the add transaction box
const AddTransaction = styled.button`
  background: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;
// Create a add transaction box container
const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e8e9;
  gap: 10px;
  padding: 15px 20px;
  margin: 20px;
  width: 100%;
  & input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;

// Create a radio box function
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

// Function to add transaction box
const AddTransactionView = (props) => {
  // Create 2 states for the amount and the description
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  //   Set default state of radio box to EXPENSE
  const [type, setType] = useState("EXPENSE");
  // Add date state variable
  const [date, setDate] = useState("");

  // Create a method - when clicked on this, it should toggle the setAddtransactionVisible from the props
  const addTransaction = () => {
    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      date,
      //   use the date now as the unique id
      id: Date.now(),
    });
    console.log({ amount, desc, type, date });
    // When the view is open, we should see the console logging the info above and closing the view
    props.setAddtransactionVisible();
  };

  return (
    <AddTransactionContainer>
      {/*  Create a input for the transaction */}
      <input
        placeholder="Amount"
        value={amount}
        // Restrict amount to number type only
        type="number"
        // When the state change, use a callback method to set the new value
        onChange={(a) => setAmount(a.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        // When the state change, use a callback method to set the new value
        onChange={(a) => setDesc(a.target.value)}
      />
      {/* Add a date input */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {/* Insert radio button here */}
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          // When the state change, use a callback method to set the new value
          checked={type === "EXPENSE"}
          onChange={(a) => setType(a.target.value)}
        ></input>
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          // When the state change, use a callback method to set the new value
          checked={type === "INCOME"}
          onChange={(a) => setType(a.target.value)}
        ></input>
        <label htmlFor="income">Income</label>
      </RadioBox>
      {/* Add Transaction button here */}
      <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
    </AddTransactionContainer>
  );
};

// The add button will be using states
const OverViewComponent = (props) => {
  // Create a state variable for the add cance button
  const [isAddTransactionVisible, setAddtransactionVisible] = useState(false);

  return (
    <Container>
      <BalanceBox>
        Balance: ${props.income - props.expense}
        {/* CONDITIONAL RENDERING: If the isAddTransactionVisible is True, set to ADD else CANCEL */}
        <AddTransaction
          // Add the onclick function here where on click it will set the isAddTransaction Visible to the opposite
          onClick={() => setAddtransactionVisible(!isAddTransactionVisible)}
        >
          {isAddTransactionVisible ? "Cancel" : "ADD"}
        </AddTransaction>
      </BalanceBox>
      {/* CONDITIONAL RENDERING if isAddTransactionVisible is true, the element <AddTransactionView />
      right after && will appear in the output. If it is false, React will ignore and skip it.*/}
      {isAddTransactionVisible && (
        <AddTransactionView
          setAddtransactionVisible={setAddtransactionVisible}
          addTransaction={props.addTransaction}
        />
      )}
      {/* Expense Container */}
      <ExpenseContainer>
        {/* Use the isIncome to determine the color of the text */}
        <ExpenseBox>
          Expense<span>${props.expense}</span>
        </ExpenseBox>
        {/* Use the isIncome to determine the color of the text */}
        {/* Add a $ before the isIncome prop name to avoid the warning that the prop is in one of the DOM elements  */}
        <ExpenseBox isIncome={true}>
          Income<span>${props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

export default OverViewComponent;
