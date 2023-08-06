import React from "react";
import styles from "./ListRow.module.css";

const ListCell = ({ children, onRowClick }) => {
  const handleClick = () => {
    onRowClick();
  };

  return (
    <tr className={styles.cell} onClick={handleClick}>
      {children}
    </tr>
  );
};

export default ListCell;
