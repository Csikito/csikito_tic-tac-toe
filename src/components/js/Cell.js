import React from "react";

export default function Cell(props) {
  const handleClick = () => {
    props.handleCellClick(props.rowindex, props.columnindex);
  };

  return (
    <div className="cell-item" onClick={handleClick}>
      {props.item}
    </div>
  );
}
