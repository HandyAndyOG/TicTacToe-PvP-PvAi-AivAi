import React from 'react'
import MenuButton from '../elements/MenuButton'
import { BsPerson } from 'react-icons/bs'
import { AiOutlineRobot } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';


const style = {
    textAlign: "center",
    marginTop: "2vh",
    marginBottom: "2vh",
}
const humanID = uuidv4()
const aiID = uuidv4()
const aiaiID = uuidv4()

const Menu = ({ clickHumanBtn, clickAiBtn, clickAiVsAiBtn, activeMenu }) => {
    return(
        <div style={style}>
            <MenuButton onClick={() => clickHumanBtn(humanID)} activeMenu={activeMenu} menuId={humanID}><BsPerson /> V <BsPerson /></MenuButton>
            <MenuButton onClick={() => clickAiBtn(aiID)} activeMenu={activeMenu} menuId={aiID}><BsPerson /> V <AiOutlineRobot/></MenuButton>
            <MenuButton onClick={() => clickAiVsAiBtn(aiaiID)} activeMenu={activeMenu} menuId={aiaiID}><AiOutlineRobot/> V <AiOutlineRobot/></MenuButton>
        </div>
    )
}

export default Menu