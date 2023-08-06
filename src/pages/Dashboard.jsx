import React, { useState } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [newKey, setNewKey] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  // Ensure unique keys for each element in mockData and timestamps
  const rows = mockData.results.map((item) => ({
    ...item,
    key: item["&key"],
  }));
  const orders = timestamps.results.map((item) => ({
    ...item,
    key: item["&key"],
  }));

  const data = rows.map((rows, index) => ({
    ...rows,
    ...orders[index],
  }));

  const handleClick = (itemId) => {
    const selectedData = data.find((item) => item.key === itemId);

    setNewKey(selectedData.key);
    setSelectedOrderDetails(selectedData.executionDetails);
    setSelectedOrderTimeStamps(selectedData.timestamps);
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${data.length} orders`}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
            newKey={newKey}
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
            newKey={newKey}
          />
        </div>
        <List
          rows={rows}
          orders={orders}
          currency={currency}
          search={searchText}
          onRowClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Dashboard;
