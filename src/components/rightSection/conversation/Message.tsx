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
        <div className="w-100p h-f-c disp-f fd-row-r" style={{paddingLeft:"53px", paddingRight:"19px", marginBottom:"1px"}}>
            <div className="w-f-c h-f-c mx-w-60p tc-gray bg-green" style={{padding:"6px 7px 8px 9px", borderRadius:"10px"}} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                <div className="pos-r disp-f tc-gray" style={{padding:"6px 7px 8px 9px", borderRadius:"10px", marginBottom:"1px"}}>
                    <div className="mx-w-100p w-w-bw oflow-w-bw tc-white">
                        {currentMessage.sentMessage}
                    </div>
                    <span onClick={handleOnClickOption} style={{position:"absolute", visibility:(dropDownVisibility?"visible":"hidden"), top:0, left:"100%", transform:"translateX(-100%) translateY(-30%)"}} data-icon="down-context" >
                        <DropDown/>
                        <div className="pos-a disp-f fd-col bg-c-gray gap-5 lt-100p" style={{padding:(optionVisibility?"20px":"0"), top:0, transform: "translateX(-100%) translateY(-100%)", borderRadius:"10px"}}>
                            <button onClick={handleOnDelete} style={{display: optionVisibility? "flex":"none", fontSize: "16px", padding:"10px", borderRadius:"5px", border:"none"}}  className="bg-green tc-gray fg-1" >delete</button>
                            <button onClick={handleOnEdit} style={{display: optionVisibility? "flex":"none", fontSize: "16px", padding:"10px", borderRadius:"5px", border:"none"}}  className="bg-green tc-gray fg-1" >edit</button>
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