import { useState, useEffect } from "react";
import PlayerInput from "../src/components/js/PlayerInput";
import Row from "../src/components/js/Row";
import Notification from "./components/js/Notification";
import "./App.css";

function App() {
  const [table, setTable] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [player, setPlayer] = useState(["", ""]);
  const [nextPlayer, setNextPlayer] = useState(null);
  const [result, setResult] = useState("");
  const [inputDisable, setInputDisable] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationNumber, setnotificationNumber] = useState(0);

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification((oldNotification) => (oldNotification = false));
      }, 5000);
    }
  });

  const playerName = (index, name) => {
    let newPlayer;
    if (index === "0") {
      newPlayer = [name, player[1]];
    } else {
      newPlayer = [player[0], name];
    }

    setPlayer(newPlayer);
  };

  console.log(notification, notificationNumber);
  const clearTable = () => {
    console.log(player[0], player[1]);
    if (player[0] === player[1] && player[0] !== "" && player[1] !== "") {
      setnotificationNumber(0);
      setNotification((oldNotification) => (oldNotification = true));
    } else {
      if (player[0].trim() === "" || player[1].trim() === "") {
        setnotificationNumber(1);
        setNotification((oldNotification) => (oldNotification = true));
      } else {
        const emptyTable = table.map((row) => row.map((cell) => null));
        setTable(emptyTable);
        setNextPlayer(player[0]);
        setInputDisable(true);
        setResult("");
        setnotificationNumber(2);
        setNotification((oldNotification) => (oldNotification = true));
      }
    }
  };
  const checkWinner = () => {
    const winComboIndexes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const tabla = table.flat();

    for (let winCombo of winComboIndexes) {
      const harmas = [
        tabla[winCombo[0]],
        tabla[winCombo[1]],
        tabla[winCombo[2]],
      ];
      if (harmas.every((elem) => elem === "X")) {
        return player[0];
      }
      if (harmas.every((elem) => elem === "O")) {
        return player[1];
      }
    }
    return "";
  };

  const handleCellClick = (row, column) => {
    if (Boolean(result)) {
      setnotificationNumber(3);
      setNotification((oldNotification) => (oldNotification = true));
    } else {
      if (table[row][column] !== null) {
        setnotificationNumber(4);
        setNotification((oldNotification) => (oldNotification = true));
      } else {
        if (nextPlayer === null) {
          setnotificationNumber(5);
          setNotification((oldNotification) => (oldNotification = true));
        } else {
          let playerMark = "";
          let newNextPlayer = "";
          if (nextPlayer === player[0]) {
            playerMark = "X";
            newNextPlayer = player[1];
          } else {
            playerMark = "O";
            newNextPlayer = player[0];
          }
          let newTable = [...table];
          newTable[row][column] = playerMark;
          setTable(newTable);
          setNextPlayer(newNextPlayer);

          const winner = checkWinner();
          if (Boolean(winner)) {
            setResult(`NYERTES: ${winner}`);
            setInputDisable(false);
          }
          const fullTable = table
            .reduce((cells, cell) => cells.concat(cell))
            .filter((x) => x === null);
          if (fullTable.length === 0 && winner === "") {
            setResult("DÖNTETLEN");
            setInputDisable(false);
          }
        }
      }
    }
    console.log("muu");
  };

  const renderTable = () => {
    return table.map((row, i) => (
      <Row row={row} key={i} rowindex={i} handleCellClick={handleCellClick} />
    ));
  };

  const youTurnClass =
    nextPlayer && inputDisable ? "next-player" : "next-player hidden";
  const winnerClass = result ? "player-names" : "";

  return (
    <div className="container">
      <h1>TIC-TAC-TOE</h1>
      <div className="top-header">
        {/* <p>Add meg a neveket és kattints az Új játék gombra</p> */}
        <button onClick={clearTable} disabled={inputDisable}>
          Új játék
        </button>
      </div>
      <div className="text-container">
        <PlayerInput
          name="Player X"
          playerName={playerName}
          index="0"
          disable={inputDisable}
        />
        <PlayerInput
          name="Player O"
          playerName={playerName}
          index="1"
          disable={inputDisable}
        />
      </div>

      <div className="table-container">
        {renderTable()}
        {/* <p className="player-names">
          {player[0]} vs. {player[1]}
        </p> */}
      </div>
      <p className={youTurnClass}>Te jössz: {nextPlayer}</p>
      <div className={winnerClass}>
        <p>{result}</p>
      </div>
      <Notification
        notification={notification}
        notificationNumber={notificationNumber}
      />
    </div>
  );
}

export default App;
