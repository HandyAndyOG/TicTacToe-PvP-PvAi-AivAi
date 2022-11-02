import React from 'react'
import '../App.css'

// simple button creation to set up the game mode buttons
const MenuButton = ({ onClick, children }) => {
    return (
        
            <button className='menuButtons' onClick={onClick}>{children}</button>
        
    )
}

export default MenuButton;