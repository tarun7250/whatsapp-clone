import { ChangeEventHandler, KeyboardEventHandler, useContext, useState } from "react";

import "./../../../App.css"
import { ActiveUserIdContext, useMessagesDispatch, useUsersDispatch } from "../../../contexts";
import Emojis from "../../../assets/Emojis";
import PlusButton from "../../../assets/PlusButton";
import SendButton from "../../../assets/SendButton";
export default function Footer() {

    const activeUserId = useContext(ActiveUserIdContext);
    const messagesDispatch = useMessagesDispatch();
    const [currentMessage, setCurrentMessage] = useState("");
    const usersDispatch = useUsersDispatch();

    if(activeUserId === null) {
        throw new Error("active user id as has value null");
    }

    const handleInput:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setCurrentMessage(e.target.value);
    }
    const handleClick=()=>{
        if(currentMessage.trim().length === 0){
            return;
        }
        usersDispatch({
            type:"SETLASTMESSAGE",
            activeUserId,
            lastMessage: currentMessage,
        })
        messagesDispatch({
            type:"ADDMESSAGE",
            activeUserId,
            lastMessage: currentMessage,
        })
        setCurrentMessage("");
    }
    const handleKeyPress:KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
          handleClick();
        }
      };
    return (
        <div style={{height:"66px", padding:"5px 16px 5px 16px"}} className="disp-f a-i-c bg-c-gray">
            <div className="h-100p disp-f a-i-c w-f-c tc-gray">
                <Emojis/>
                <span style={{padding:"8px"}} className="w-f-c">
                    <PlusButton/>
                </span>
            </div>


            <div className="fg-1 w-100p bg-c-gray disp-f a-i-c j-c-sb ">
                <div style={{borderRadius:"10px", height:"42px", padding:"9px 12px 9px 12px"}} className="bg-c-lgray fg-1">
                    <input onKeyDown={handleKeyPress} onChange={handleInput} className=" bg-c-lgray h-100p" style={{border:0, color: "rgb(209, 215, 219)", fontSize:"15px", fontWeight:100, outline: "0px solid transparent", width:"90%"}} contentEditable="true" placeholder="Type a message" value={currentMessage}></input>
                </div>
                <button onClick={handleClick} style={{border:0}} className="bg-t tc-gray">
                    <SendButton/>
                </button>
            </div>


        </div>
    )
}

