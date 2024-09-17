import { useContext, useState } from "react";
import "./conversation.css";
import { CompactContext, MessagesContext, SetMessagesContext } from "../../../contexts";
import ConfirmationBox from "../../confirmationBox/ConfirmationBox";
import getCurrentTime from "../../../utils/getCurrentTime";

export default function Message({activeUserId, messageIndex}:{activeUserId:number,  messageIndex:number}) {
    
    const messages = useContext(MessagesContext);
    const setMessages = useContext(SetMessagesContext);
    const currentMessage = messages[activeUserId][messageIndex];
    const compactMode = useContext(CompactContext);

    const [dropDownVisibility, setDropDownVisibility] = useState(false);
    const [optionVisibility, setOptionVisibility] = useState(false);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [editText, setEditText] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    
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
        // setActionForConfirmationBox("DELETE-MESSAGE");
        // setSelectedMessage(messageIndex);
        setOptionVisibility(false);
        setIsEditMode(false);
        setIsModalVisible(true);
    }

    const handleOnEdit = ()=>{
        setIsEditMode(true);
        setIsModalVisible(true);
    }

    const handleCancelButton = ()=>{
        setIsModalVisible(false);
    }
    const handleConfirmButton = ()=>{
        setIsModalVisible(false);

        if(isEditMode){
            setMessages((messages)=>{
                
                messages[activeUserId][messageIndex] = {sentMessage:editText, messageTime: getCurrentTime()};
                return [...messages];
            });
        }
        else {
            setMessages((messageList)=>{
                if(activeUserId === null){
                    throw new Error("delete message called with null active user Id");
                }

                return messageList.map((userMessages,userIndex)=>{
                    if(activeUserId === userIndex) {
                        return userMessages.filter((_item,index)=>{return !(index === messageIndex)})
                    }
                    return userMessages;
                });
            });
        }
    }
    
    return (
        <>
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
                    {compactMode?currentMessage.messageTime:""}
                </div>
            </div>
        </div>
        <ConfirmationBox isModalVisible={isModalVisible}>
            <ConfirmationBox.Header><h1>{"Confirm Delete"}</h1></ConfirmationBox.Header>
            {isEditMode?<ConfirmationBox.Body editText={editText} setEditText={setEditText}/>:null}
            <ConfirmationBox.Footer>
                <button onClick={handleCancelButton} className="confirmation-box-left-button">CANCEL</button>
                <button onClick={handleConfirmButton} className="confirmation-box-right-button">YES</button>
            </ConfirmationBox.Footer>
        </ConfirmationBox>
        </>
    )
}