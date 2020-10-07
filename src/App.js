import React, { useEffect, useState } from "react";
import "./styles.css";
let line = 1;
function Ball(props) {
  const divStyle = {
    position: "relative",
    top: props.yPos + "px",
    left: props.xPos + "px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "lightgrey"
  };

  return <div style={divStyle} onClick={props.onClick}></div>;
}

function Table(props) {
  const divStyleTable = {
    position: "relative",
    top: props.yPos + "px",
    left: props.xPos.tableX + "px",
    width: "80px",
    height: "30px",
    borderRadius: "10%",
    backgroundColor: "lightblue"
  };

  return <div id={props.id} style={divStyleTable}></div>;
}

export default function App() {
  const [ballX, moveBallX] = useState(150);

  const [ballY, moveBallY] = useState(25);

  const [tableX, moveTableX] = useState({ tableX: 150 });
  const tableY = 220;

  let moveBall = (line) => {
    if (ballY > 220) {
      return;
    }

    moveBallY(ballY + line);
  };

  let moveTable = (e) => {
    if (e.clientX < 40 || e.clientX > 705) {
    } else moveTableX({ tableX: e.clientX - 45 });
  };

  useEffect(() => {
    console.log("running");
    if (ballY > 145) {
      if (ballX < tableX.tableX + 70 || ballX + 30 < tableX.tableX) {
        line = -1;
      }
    }
    if (ballY < 25) {
      line = 1;
      return;
    }
    console.log(ballY);
    setTimeout(() => {
      moveBall(line);
    }, 5);
  }, [ballY]);

  return (
    <div
      className="App"
      onMouseEnter={() => moveBall(line)}
      onMouseMove={moveTable}
      // onMouseOut={stopBall}
    >
      <Table xPos={tableX} yPos={tableY} />
      <Ball xPos={ballX} yPos={ballY} />
    </div>
  );
}
