import React from "react";

export default function PlayerInput(props) {
  const handleChange = (e) => {
    console.log(e.target.value);
    props.playerName(props.index, e.target.value);
  };
  return (
    <div className="player-input">
      <label>
        {props.name} :
        <input
          type="text"
          name="player"
          placeholder="Írd be a neved"
          onChange={handleChange}
          disabled={props.disable}
        />
      </label>
    </div>
  );
}
