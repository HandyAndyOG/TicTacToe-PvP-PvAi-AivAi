import React, { useState, useEffect, useRef, useCallback } from "react";
import Board from "./Board";
import { checkWinner, AiMove, HumanAiMove, Winner } from "./Winner";
import Menu from "./Menu";
import { useIdleTimer } from "react-idle-timer";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isAiNext, setAiNext] = useState(null);
  const [winningState, setWinningState] = useState(null);
  const [menu, setMenu] = useState(null);
  const [Turn, setTurn] = useState("X");
  const [isAi1On, setIsAi1On] = useState(null);
  const [isAi2On, setIsAi2On] = useState(null);
  const [userIdle, setUserIdle] = useState(false);
  const userIdleRef = useRef({ userIdle });
  const [afkHuman, setAfkHuman] = useState(null);
  const [activeMenu, setActiveMenu] = useState({});
  let winner = Winner(board);

  const handleOnIdle = () => {
    let boardCurrent = JSON.parse(localStorage.getItem("boardCurrent"));
    setBoard([...boardCurrent]);
    setMenu(true);
    setUserIdle(true);
    setAfkHuman("O");
  };

  const handleOnActive = () => {
    setUserIdle(false);
  };
  const handleOnAction = () => {
    setUserIdle(false);
  };

  useIdleTimer({
    timeout: 60 * 1000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 100,
  });

  const handleClick = useCallback((i) => {
    const changeTurn = () => {
        if (Turn === "X") setTurn("O");
        else if (Turn === "O") setTurn("X");
      };
    const replica = board.slice();
    if (winner || replica[i]) return;
    replica[i] = Turn;
    setBoard(replica);
    changeTurn();
  }, [Turn, board, winner]);


  const clickHumanBtn = (menuId) => {
    setBoard(Array(9).fill(null));
    setMenu(false);
    setTurn("X");
    setAiNext(null);
    setIsAi1On(null);
    setIsAi2On(null);
    setAfkHuman(null);
    setUserIdle(false);
    setActiveMenu((prevState) => ({
      [menuId]: !prevState[menuId],
    }));
  };

  const clickAiBtn = (menuId) => {
    setBoard(Array(9).fill(null));
    setMenu(true);
    setTurn("X");
    setAiNext("X");
    setIsAi1On(null);
    setIsAi2On(null);
    setAfkHuman(null);
    setUserIdle(false);
    setActiveMenu((prevState) => ({
      [menuId]: !prevState[menuId],
    }));
  };

  const clickAiVsAiBtn = (menuId) => {
    setBoard(Array(9).fill(null));
    setMenu(true);
    setTurn("X");
    setIsAi1On("X");
    setIsAi2On("O");
    setUserIdle(false);
    setAfkHuman(null);
    setAiNext(null);
    setActiveMenu((prevState) => ({
      [menuId]: !prevState[menuId],
    }));
  };
  const StartGame = () => {
    setBoard(Array(9).fill(null));
    setMenu(true);
    setTurn("X");
  };

  useEffect(() => {
    if (menu && isAi1On === Turn) {
      setTimeout(() => {
        handleClick(AiMove(board, isAi1On, isAi1On === "X" ? "O" : "X"));
      }, 1000);
    }
    if (
      (menu === userIdleRef.current.userIdle) !== userIdle &&
      afkHuman === Turn
    ) {
      setTimeout(() => {
        handleClick(AiMove(board, afkHuman, afkHuman === "X" ? "O" : "X"));
      }, 1000);
    }
    if (menu && isAi2On === Turn) {
      setTimeout(() => {
        handleClick(HumanAiMove(board, isAi2On, isAi2On === "X" ? "O" : "X"));
      }, 1000);
    }
    if (menu && isAiNext === Turn) {
      setTimeout(() => {
        handleClick(AiMove(board, isAiNext, isAiNext === "X" ? "O" : "X"));
      }, 500);
    }
    localStorage.setItem("boardCurrent", JSON.stringify(board));
    const changeWinState = checkWinner(board);
    setWinningState(changeWinState ? changeWinState[0] : changeWinState);
  }, [board, Turn, handleClick, isAiNext, menu, afkHuman, isAi2On, userIdle, isAi1On]);

  return (
    <>
      <Menu
        clickHumanBtn={clickHumanBtn}
        clickAiBtn={clickAiBtn}
        clickAiVsAiBtn={clickAiVsAiBtn}
        activeMenu={activeMenu}
      />
      <Board
        activeMenu={activeMenu}
        squares={board}
        onClick={handleClick}
        menu={menu}
        Winner={Winner}
        isAiNext={isAiNext}
        Turn={Turn}
        isAi1On={isAi1On}
        isAi2On={isAi2On}
        userIdle={userIdle}
        afkHuman={afkHuman}
      />
      <div className="results">
        {winner ? <h2>Result</h2> : ""}

        <p>
          {winningState === "D"
            ? "Draw"
            : winningState !== null && "Winner: " + winningState}
          {winningState !== null ? "" : "Next Player: " + Turn}
        </p>
        {Object.values(activeMenu).includes(true) ? (
          <button className="startButton" onClick={StartGame}>
            Restart
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Game;
