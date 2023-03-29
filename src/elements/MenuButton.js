import React from 'react'
import '../App.css'

// simple button creation to set up the game mode buttons
const MenuButton = ({ onClick, children, activeMenu, menuId }) => {
    return (
        
            <button className={activeMenu[menuId] ? 'menuButtons clickedMenu' : 'menuButtons'} onClick={onClick}>{children}</button>
        
    )
}

export default MenuButton;