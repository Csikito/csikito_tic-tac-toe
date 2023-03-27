import React from "react";
import Cell from "./Cell";

export default function Row(props) {
  const Cells = props.row.map((cellValue, i) => (
    <Cell
      item={cellValue}
      key={i}
      rowindex={props.rowindex}
      columnindex={i}
      handleCellClick={props.handleCellClick}
    />
  ));

  return <div className="row-item">{Cells}</div>;
}
