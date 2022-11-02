import React from 'react'

const Square = ({ value, onClick }) => (
	<button className='squareButton' onClick={onClick}>
		{value}
	</button>
);

export default Square