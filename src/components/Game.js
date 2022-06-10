import React, { useState, useEffect, useRef } from 'react'
import Board from './Board'
import {checkWinner, AiMove, HumanAiMove, Winner } from './Winner'
import Menu from './Menu'
import { useIdleTimer } from 'react-idle-timer';
// import Modal from 'react-modal'

// Modal.setAppElement('#root')

// const modalStyle = {
//     height: "80vh",
//     textAlign: "center",
//     fontSize: "2vh",
//     borderRadius: "30px",
//     border: "5px solid #f2f2f2",
//     padding: "2vw",
//     backgroundColor: "#1553b7"
// }

// const h2Modal = {
//     marginTop: "1vh",
//     marginBottom: "1vh",
//     border: "5px solid #f2f2f2",
//     borderRadius: "40px",
//     color: "#f2f2f2",
//     backgroundColor: "#FFB32C",

// }

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isAiNext, setAiNext] = useState(null);
    let winner = Winner(board);
    const [winningState, setWinningState] = useState(null)
    const [menu, setMenu] = useState(null)
    const [Turn, setTurn] = useState("X")
    const [isAi1On, setIsAi1On] = useState(null)
    const [isAi2On, setIsAi2On] = useState(null)
    const [userIdle, setUserIdle] = useState(false)
    // const [modalIsOpen, setModalIsOpen] = useState(false)
    const userIdleRef = useRef({userIdle})
    const [afkHuman, setAfkHuman] = useState(null)

    const handleOnIdle = event => {
        console.log('user is idle', event)
        var boardCurrent = JSON.parse(localStorage.getItem("boardCurrent"))
        setBoard([...boardCurrent]);
        setMenu(true)
        setUserIdle(true)
        setAfkHuman("O")
        // setModalIsOpen(true)
    }
    
    const handleOnActive = event => {
        setUserIdle(false)
        // setModalIsOpen(false)
        }
    const handleOnAction = (e) => {
        setUserIdle(false)
        // setModalIsOpen(false)
        }
    
    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 15 * 1000,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 100
        })

    useEffect( () => {
        
        if (menu && isAiNext == Turn) {
            setTimeout(() => {
            
            handleClick(AiMove(board, isAiNext, isAiNext == 'X' ? 'O' : 'X'));  
        }, 500);
        } localStorage.setItem("boardCurrent", JSON.stringify(board))
        const changeWinState = checkWinner(board)
        setWinningState(changeWinState?changeWinState[0]:changeWinState)
    }, [board]);

    useEffect( () => {
        
        if (menu && isAi1On == Turn) {
            setTimeout(() => {
            handleClick(AiMove(board, isAi1On, isAi1On == 'X' ? 'O' : 'X')); 
        }, 1000);
        }
    }, [board]);

    useEffect( () => {
        
        if (menu && isAi2On == Turn) {
            setTimeout(() => {
            handleClick(HumanAiMove(board, isAi2On, isAi2On == 'X' ? 'O' : 'X')); 
        }, 1000);
        }
    }, [board]);

    const handleClick = (i) => {

        const replica = board.slice()

        if (winner || replica[i]) return;
        replica[i] = Turn
        setBoard(replica) 
        changeTurn()
    };

    useEffect( () => {
           
        if (menu == userIdleRef.current.userIdle !== userIdle && afkHuman == Turn) {
            setTimeout(() => {

            handleClick(AiMove(board, afkHuman, afkHuman == 'X' ? 'O' : 'X')); 
        }, 500);
        }       
    }, [board]);

    let changeTurn=()=>{
        if(Turn==='X')
            setTurn('O')
        else
        if(Turn==='O')
            setTurn('X')
    }

    const clickHumanBtn = () => {
        setBoard(Array(9).fill(null));
        setMenu(false)
        setTurn("X")
        setAiNext(null)
        setIsAi1On(null)
        setIsAi2On(null)
        setAfkHuman(null)
        setUserIdle(false)
        // setModalIsOpen(false)
    }

    const clickAiBtn = () => {
        setBoard(Array(9).fill(null));
        setMenu(true)
        setTurn("X")
        setAiNext('X')
        setIsAi1On(null)
        setIsAi2On(null)
        setAfkHuman(null)
        setUserIdle(false)
    }

    const clickAiVsAiBtn = () => {
        setBoard(Array(9).fill(null));
        setMenu(true)
        setTurn("X")
        setIsAi1On("X")
        setIsAi2On("O")
        setUserIdle(false)
        setAfkHuman(null)
        setAiNext(null)
    }
    const StartGame = () => {
        setBoard(Array(9).fill(null));
        setMenu(true)
        setTurn("X")
    }

    
    return(
    <>
            {/* <Modal isOpen={modalIsOpen}>
                <div style={modalStyle}>
                    <h2 style={h2Modal}>You must be AFK...</h2>
                    <p>We'll finish up the game for you OR move your mouse to continue where the Ai has left off</p>
                </div>
            </Modal> */}
            <Menu clickHumanBtn={clickHumanBtn} clickAiBtn={clickAiBtn} clickAiVsAiBtn={clickAiVsAiBtn} />
            <Board squares={board} onClick={handleClick} menu={menu} Winner={Winner} isAiNext={isAiNext} Turn={Turn} isAi1On={isAi1On} isAi2On={isAi2On} userIdle={userIdle} afkHuman={afkHuman}/>
            <div className='results'>
                <h2>Result</h2>
                <p>
                {winningState==='D' ? "Draw" : winningState!==null && "Winner: " + winningState}
                {winningState!==null ? "" : "Next Player: " + Turn}
                </p>
                <button className='startButton' onClick={StartGame}>Start Game</button>
              </div>
        
    </>
    )
}

export default Game;

