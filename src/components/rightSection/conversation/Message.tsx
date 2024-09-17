import { useContext, useState } from "react";
import "./conversation.css";
import { MessagesContext, SetActionForConfirmationBox, SetSelectedMessageContext } from "../../../contexts";

export default function Message({activeUserId, messageIndex}:{activeUserId:number,  messageIndex:number}) {
    
    const messages = useContext(MessagesContext);
    const setActionForConfirmationBox = useContext(SetActionForConfirmationBox);
    const setSelectedMessage = useContext(SetSelectedMessageContext);
    const currentMessage = messages[activeUserId][messageIndex];

    const [dropDownVisibility, setDropDownVisibility] = useState(false);
    const [optionVisibility, setOptionVisibility] = useState(false);
    
    const handleMouseEnter = () => {
        setDropDownVisibility(true);
    }
    const handleMouseLeave = () => {
        setDropDownVisibility(false);
        setOptionVisibility(false);
    }
    const handleOnClickOption = () => {
        setOptionVisibility(!optionVisibility);
    }
    const handleOnDelete = () => {
        // setMessages((messageList)=>{
        //     messageList[activeUserId] = messageList[activeUserId].filter((_item,index)=>{
        //         return !(index === messageIndex);
        //     });
        //     return structuredClone( messageList);
        // })
        setActionForConfirmationBox("DELETE-MESSAGE");
        setSelectedMessage(messageIndex);
        setOptionVisibility(false);
    }

    const handleOnEdit = ()=>{
        setActionForConfirmationBox("EDIT");
        setSelectedMessage(messageIndex);
        setOptionVisibility(false);
    }
    
    return (
        <div className="message-row">
            <div className="message-outer" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                <div className="message-upper-outer">
                    <div className="message-text">
                        {currentMessage.sentMessage}
                    </div>
                    <span onClick={handleOnClickOption} style={{position:"relative", visibility:(dropDownVisibility?"visible":"hidden")}} data-icon="down-context" >
                        <svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 18 18"><title>down-context</title><path fill="currentColor" d="M3.3,4.6L9,10.3l5.7-5.7l1.6,1.6L9,13.4L1.7,6.2L3.3,4.6z"></path></svg>
                        <div className="message-options" style={{padding:(optionVisibility?"20px":"0")}}>
                            <button onClick={handleOnDelete} style={{display: optionVisibility? "flex":"none"}}  className="message-options-button" >delete</button>
                            <button onClick={handleOnEdit} style={{display: optionVisibility? "flex":"none"}}  className="message-options-button" >edit</button>
                        </div>
                    </span>
                </div>
                <div className="message-time">
                    {currentMessage.messageTime}
                </div>
            </div>
        </div>
    )
}