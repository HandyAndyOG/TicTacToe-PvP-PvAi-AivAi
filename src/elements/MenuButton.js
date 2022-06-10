import React from 'react'
import '../App.css'

const MenuButton = ({ value, onClick, children }) => {
    return (
        
            <button className='menuButtons' onClick={onClick}>{children}</button>
        
    )
}

export default MenuButton;