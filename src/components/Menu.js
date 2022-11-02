import React from 'react'
import MenuButton from '../elements/MenuButton'
import { BsPerson } from 'react-icons/bs'
import { AiOutlineRobot } from 'react-icons/ai'


const style = {
    textAlign: "center",
    marginTop: "2vh",
    marginBottom: "2vh",
}


const Menu = ({ clickHumanBtn, clickAiBtn, clickAiVsAiBtn }) => {
    return(
        <div style={style}>
            <MenuButton onClick={clickHumanBtn}><BsPerson /> V <BsPerson /></MenuButton>
            <MenuButton onClick={clickAiBtn}><BsPerson /> V <AiOutlineRobot/></MenuButton>
            <MenuButton onClick={clickAiVsAiBtn}><AiOutlineRobot/> V <AiOutlineRobot/></MenuButton>
        </div>
    )
}

export default Menu