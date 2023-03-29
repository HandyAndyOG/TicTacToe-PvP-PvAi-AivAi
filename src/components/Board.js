import React from 'react'
import Square from './Square'
import '../App.css'

const style = {
	border: "5px solid #f2f2f2",
	borderRadius: "10px",
	margin: "0 auto",
	display: "grid",
	gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
	boxShadow: "0 1px 1px 0 rgb(64, 64, 64), 0 5px 5px 0 rgb(64, 64, 64)",
};

const Board = ({ squares, onClick, activeMenu }) => (
	<div className='boardQuery' style={style}>
		{squares.map((square, i) => (
			<Square key={i} value={square}  onClick={Object.values(activeMenu).includes(true) ? (() => onClick(i)): undefined} />
		))}
	</div>
);

export default Board;
