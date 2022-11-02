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

// maps out squares using square and index i, passes through a value catcher called "square" and a click listener related to the index. Not a problem to use index here as the items are not added or removed like a shopping list.
const Board = ({ squares, onClick }) => (

	<div className='boardQuery' style={style}>
		{squares.map((square, i) => (
			<Square key={i} value={square} onClick={() => onClick(i)} />
		))}
	</div>
);

export default Board;
