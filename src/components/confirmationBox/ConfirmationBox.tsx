import { ChangeEventHandler, useContext, useState } from "react";
import "./confirmationBox.css"
import { ActionForConfirmationBox, ActiveUserIdContext, DeleteIdContext, SelectedMessageContext, SetActionForConfirmationBox, SetActiveUserIdContext, SetDeleteIdContext, SetMessagesContext, SetSelectedMessageContext, SetUsersContext } from "../../contexts";
import { Action } from "../../types/commonTypes";
import getCurrentTime from "../../utils/getCurrentTime";


const ConfirmationBox = () => {

    const [currentMessage, setCurrentMessage] = useState("");
    const actionForConfirmationBox = useContext(ActionForConfirmationBox);
    const setActionForConfirmationBox = useContext(SetActionForConfirmationBox);
    const setMessages = useContext(SetMessagesContext);
    const setUsers = useContext(SetUsersContext);
    const activeUserId = useContext(ActiveUserIdContext);
    const setActiveUserId = useContext(SetActiveUserIdContext);
    const deleteId = useContext(DeleteIdContext);
    const setDeleteId = useContext(SetDeleteIdContext);
    const selectedMessage = useContext(SelectedMessageContext);
    const setSelectedMessage = useContext(SetSelectedMessageContext);



    const getButtonText :  (action:Action)=>string = (action) => {
        if(action === "ADD-USER"){
            return "Start new chat";
        }
        else if(action.startsWith("DELETE")){
            return "Yes";
        }
        else if(action === "EDIT"){
            return "Save";
        }
        else{
            return "";
        }
    };

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCurrentMessage(e.target.value);
    }

    const handleCancelButton = () => {
        setActionForConfirmationBox("HIDDEN");
    };

    const handleConfirmButton = ()=>{
        if(actionForConfirmationBox === "ADD-USER"){
            if(currentMessage === ""){return;}
            setUsers((users)=>{
                return [...users,
                    {
                        id:"user_id_",
                        name:currentMessage,
                        profileImg: "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
                    }
                ]
            });
            setMessages((messages)=>{
                return [...messages,[]];
            });
        }
        else if(actionForConfirmationBox === "DELETE-MESSAGE"){
            console.log(activeUserId,selectedMessage);
            setMessages((messageList)=>{
                if(activeUserId === null){
                    throw new Error("delete message called with null active user Id");
                }

                return messageList.map((userMessages,userIndex)=>{
                    if(activeUserId === userIndex) {
                        return userMessages.filter((_item,index)=>{return !(index === selectedMessage)})
                    }
                    return userMessages;
                });
                // messageList[activeUserId] = messageList[activeUserId].filter((_item,index)=>{
                //     console.log("cnt");
                //     return !(index === selectedMessage);
                // });
                // return [...messageList];
            });
            setSelectedMessage(null);
        }
        else if(actionForConfirmationBox === "DELETE-USER"){
            setUsers((users)=>{
                return users.filter((_item,index)=>{
                    return !(deleteId === index);
                });
            });
            setMessages((messages)=>{
                return messages.filter((_item,index)=>{
                    return !(deleteId === index);
                });
            });
            setDeleteId(null);
            if(deleteId === activeUserId){
                setActiveUserId(null);
            }
        }
        else if(actionForConfirmationBox === "EDIT"){
            if(currentMessage === ""){
                return;
            }
            setMessages((messages)=>{
                if(activeUserId === null){
                    throw new Error("edit message called with null active user Id");
                }
                if(selectedMessage === null) {
                    throw new Error("edit message called with null, because of no selected message");
                }
                messages[activeUserId][selectedMessage] = {sentMessage:currentMessage, messageTime: getCurrentTime()};
                return [...messages];
            });
            setSelectedMessage(null);

        }
        else{
            return "";
        }
        setActionForConfirmationBox("HIDDEN")
    }

    return (
        <div className="confirmation-box" style={{ display: (actionForConfirmationBox === "HIDDEN" ? "none" : "flex") }}>
            {actionForConfirmationBox.startsWith("DELETE")?<div className="confirmation-box-top">Are you sure, you want to delete?</div>:<input onChange={handleInput} className="confirmation-box-input" contentEditable="true" placeholder="Type a message" value={currentMessage}></input>}
            <div className="confirmation-box-bottom">
                <button onClick={handleCancelButton} className="confirmation-box-left-button">cancel</button>
                <button onClick={handleConfirmButton} className="confirmation-box-right-button">{getButtonText(actionForConfirmationBox)}</button>
            </div>
        </div>
    )
}
export default ConfirmationBox;