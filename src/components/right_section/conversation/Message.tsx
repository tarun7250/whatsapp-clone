import { useState } from "react";
import "./conversation.css";
import { messageList } from "../../../assets/messages";

export default function Message({userId, index, sentMessage, messageTime, makeRerender, setMakeRerender }: {userId:number, index:number, sentMessage: string, messageTime: string,makeRerender:boolean ,setMakeRerender: (makeRerender:boolean)=>void }) {
    const [dropDownVisibility, setDropDownVisibility] = useState(false);
    const [deleteVisibility, setDeleteVisibility] = useState(false);
    const handleMouseEnter = () => {
        setDropDownVisibility(true);
    }
    const handleMouseLeave = () => {
        setDropDownVisibility(false);
        setDeleteVisibility(false);
    }
    const handleOnClickOption = () => {
        setDeleteVisibility(!deleteVisibility);
    }
    const handleOnDelete = () => {
        messageList[userId] = messageList[userId].filter((_item,id)=>{
            return !(index === id);
        })
        setDeleteVisibility(false);
        setMakeRerender(!makeRerender);
    }
    return (
        <div className="message-row">
            <div className="message-outer" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                <div className="message-upper-outer">
                    <div className="message-text">
                        {sentMessage}
                    </div>
                    <span onClick={handleOnClickOption} style={{position:"relative", visibility:(dropDownVisibility?"visible":"hidden")}} data-icon="down-context" >
                        <svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18"><title>down-context</title><path fill="currentColor" d="M3.3,4.6L9,10.3l5.7-5.7l1.6,1.6L9,13.4L1.7,6.2L3.3,4.6z"></path></svg>
                        <button onClick={handleOnDelete} style={{display: deleteVisibility? "flex":"none"}}  className="delete-button" >delete</button>
                    </span>
                </div>
                <div className="message-time">
                    {messageTime}
                </div>
            </div>
        </div>
    )
}