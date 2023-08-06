import React from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import styles from "./List.module.css";

const List = ({ rows, orders, currency, search, onRowClick }) => {
  const data = rows.map((row, index) => ({ ...row, ...orders[index] }));

  const filteredData = data.filter((item) =>
    item["&id"].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {currency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {filteredData.map((info) => (
          <ListRow
            key={info["&key"]}
            item={info}
            onRowClick={onRowClick}
          >
            <ListRowCell>{info["&id"]}</ListRowCell>
            <ListRowCell>{info.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{info.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{info.timestamps.orderSubmitted}</ListRowCell>
            <ListRowCell>
              {info.bestExecutionData.orderVolume[currency]}
            </ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
