import { ChangeEventHandler, KeyboardEventHandler, useContext, useState } from "react";

import "./../../../App.css"
import { ActiveUserIdContext, useMessagesDispatch, useUsersDispatch } from "../../../contexts";
import Emojis from "../../../assets/Emojis";
import PlusButton from "../../../assets/PlusButton";
import SendButton from "../../../assets/SendButton";
import { ADD_MESSAGE, SET_LAST_MESSAGE } from "../../../constant/actions";
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
            type: SET_LAST_MESSAGE,
            activeUserId,
            lastMessage: currentMessage,
        })
        messagesDispatch({
            type: ADD_MESSAGE,
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
        <div className="pad-t-5 pad-b-16 pad-l-5 pad-r-16 h-66 disp-f a-i-c bg-c-gray">
            <div className="h-100p disp-f a-i-c w-f-c tc-gray">
                <Emojis/>
                <span className="pad-8 w-f-c">
                    <PlusButton/>
                </span>
            </div>


            <div className="fg-1 w-100p bg-c-gray disp-f a-i-c j-c-sb ">
                <div className="br-10 h-40 pad-t-9 pad-b-12 pad-l-9 pad-r-12 bg-c-lgray fg-1">
                    <input onKeyDown={handleKeyPress} onChange={handleInput} className=" bg-c-lgray h-100p b-0 f-sz-15 f-wt-100 w-90p tc-modal outline-0-solid-trans"  contentEditable="true" placeholder="Type a message" value={currentMessage} role="message-input"></input>
                </div>
                <button aria-label="send-message" onClick={handleClick}  className="b-0 bg-t tc-gray">
                    <SendButton/>
                </button>
            </div>


        </div>
    )
}

