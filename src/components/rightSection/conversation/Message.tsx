import { useContext, useState } from "react";
import { CompactContext, useMessages, useMessagesDispatch } from "../../../contexts";
import ConfirmationBox from "../../confirmationBox/ConfirmationBox";
import DropDown from "../../../assets/DropDown";

export default function Message({activeUserId, messageIndex}:{activeUserId:number,  messageIndex:number}) {
    
    const messages = useMessages();
    const messagesDispatch = useMessagesDispatch();
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
            messagesDispatch({
                type:"EDITMESSAGE",
                newMessage:editText,
                activeUserId,
                messageId:messageIndex,
            })
        }
        else {
            messagesDispatch({
                type:"DELETEMESSAGE",
                messageId: messageIndex,
                activeUserId,
            })
        }
    }
    
    return (
        <>
        <div className="w-100p h-f-c disp-f fd-row-r pad-l-53 pad-r-19 margin-bottom-1" >
            <div className="w-f-c h-f-c mx-w-60p tc-gray bg-green br-10 pad-t-6 pad-b-7 pad-l-8 pad-r-9"  onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                <div className="pos-r disp-f tc-gray br-10 pad-t-6 pad-b-7 pad-l-8 pad-r-9 margin-bottom-1" >
                    <div className="mx-w-100p w-w-bw oflow-w-bw tc-white">
                        {currentMessage.sentMessage}
                    </div>
                    <span onClick={handleOnClickOption} className="pos-a top-0p lt-100p translateXY-100-30" style={{visibility:(dropDownVisibility?"visible":"hidden")}} data-icon="down-context" >
                        <DropDown/>
                        <div className="pos-a disp-f fd-col bg-c-gray gap-5 lt-100p br-10 translateXY-100-100 top-0p" style={{padding:(optionVisibility?"20px":"0")}}>
                            <button onClick={handleOnDelete} style={{display: optionVisibility? "flex":"none"}}  className="b-none br-5 pad-10 f-sz-16 bg-green tc-gray fg-1" >delete</button>
                            <button onClick={handleOnEdit} style={{display: optionVisibility? "flex":"none"}}  className="b-none br-5 pad-10 f-sz-16 bg-green tc-gray fg-1" >edit</button>
                        </div>
                    </span>
                </div>
                <div className="tc-gray pos-r fl-r">
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