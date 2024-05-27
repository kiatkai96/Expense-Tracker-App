import styled from "styled-components";
import { useState, useEffect } from "react";

// Using the div from the styled-components and style the div accordingly
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Poppins;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e7e8e9;
    outline: none;
    width: 100%;
  }
`;
// Define the Cell
const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  font-size: 14px;
  border-radius: 2px;
  align-items: center;
  font-weight: normal;
  width: 100%;
  justify-content: space-between;
  border: 1px solid #e6e8e9;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

// Create a TransactionCell component
const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload?.desc}</span>
      <span>${props.payload?.amount}</span>
      <span>{props.payload?.date}</span>
    </Cell>
  );
};

const TransactionComponent = (props) => {
  const [filteredTransaction, updateTxn] = useState(props.transactions);
  const [searchData, updateSearchData] = useState("");
  const filterData = (searchData) => {
    if (!searchData || !searchData.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchData.toLowerCase().trim())
    );
    updateTxn(txn);
  };

  useEffect(() => {
    filterData(searchData);
  }, [props.transactions]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search"
        value={searchData}
        onChange={(e) => {
          updateSearchData(e.target.value);
          filterData(e.target.value);
        }}
      ></input>
      {/* Using the state transactions from the home.js HomeComponent */}
      {filteredTransaction?.length
        ? filteredTransaction.map((payload, index) => (
            <TransactionCell key={index} payload={payload} />
          ))
        : ""}
    </Container>
  );
};

export default TransactionComponent;
