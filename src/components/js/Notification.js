import React from "react";
import "../css/Notification.css";

export default function Notification(props) {
  const notificationFeed = [
    "Nem lehet ugyan az a nevetek!",
    "Add meg a neveket!",
    "Új játék kezdődik.",
    "Vége a játéknak. Előbb indítsd új játékot.",
    "Ez a cella már foglalt. Üres cellára kattintss!",
    "Először add meg a neveket, és indítsd el a játékot!",
  ];

  const newGameClass = `noti__text ${
    props.notificationNumber == 2 ? "new" : ""
  }`;

  return props.notification ? (
    <div className="notification">
      <div className={newGameClass}>
        <p>{notificationFeed[props.notificationNumber]}</p>
      </div>
    </div>
  ) : (
    ""
  );
}
