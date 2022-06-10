import React from 'react'

// create the square that listens for a value to be passed on click

const Square = ({ value, onClick }) => (
	<button className='squareButton' onClick={onClick}>
		{value}
	</button>
);

export default Square