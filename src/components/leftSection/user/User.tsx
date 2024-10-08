import "./../../../App.css"
//import type { UserIndex } from "../../../types/commonTypes";
import ProfilePicture from "./ProfilePicture";
import Description from "./Description";
// import { messageList } from "../../../assets/messages";
import { useContext, useState } from "react";
import { ActiveUserIdContext, SetActiveUserIdContext, useMessages, useMessagesDispatch, useUsers, useUsersDispatch } from "../../../contexts";
import ConfirmationBox from "../../confirmationBox/ConfirmationBox";
import DeleteUser from "../../../assets/DeleteUser";
export default function User({userId}:{userId:number}){

    const activeUserId = useContext(ActiveUserIdContext);
    const setActiveUserId = useContext(SetActiveUserIdContext);
    const users = useUsers();
    const messages = useMessages();
    const usersDispatch = useUsersDispatch();
    const messagesDispatch = useMessagesDispatch();

    const [tooltipPosition,setTooltipPosition] = useState({top:0,left:0});
    const [toolTipVisible, setTooltipVisible]  = useState(false);
    const [dropDownVisibility, setDropDownVisibility] = useState(false);
    const [isModalVisible,setIsModalVisible] = useState(false);
    
    const lastMessage = messages[userId][messages[userId].length -1]??{sentMessage:"",messageTime:""};

    const handleMouseEnter = (event:React.MouseEvent<HTMLElement>) => {
        if(lastMessage.sentMessage !== ""){
            setTooltipVisible(true);
        }
        setDropDownVisibility(true);
        const rect = event.currentTarget.getBoundingClientRect();
        const tooltipHeight = 100;
        const windowHeight = window.innerHeight;
        let tooltipTop = rect.top;
        if (rect.bottom + tooltipHeight > windowHeight) {
        tooltipTop = rect.top - tooltipHeight + 20;
        }
        setTooltipPosition({
            top: tooltipTop,
            left: rect.right,
        });
    }
    const handleMouseLeave = () => {
        setTooltipVisible(false);
        setDropDownVisibility(false);
    }
    const handleOnDelete = () => {
        setIsModalVisible(true);
    }
    const handleClick = () => {
        setActiveUserId(userId);
        console.log(userId);
        console.log(users);
    };
    const handleCancelButton=()=>{
        setIsModalVisible(false);
    };
    const handleConfirmButton=()=>{
        usersDispatch({
            type: "REMOVE_USER",
            userId,
        })
        messagesDispatch({
            type:"REMOVE_USER",
            userId,
        })
        setActiveUserId(null);
        setIsModalVisible(false);
    };       

    return (
        <>
            <div  onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} style={{background:(userId === activeUserId?`rgb(42, 57, 66)`:`rgb(17, 27, 33)`),borderBottom:"solid 1px rgba(209, 215, 219,0.2)"}} className="pos-r oflow-v disp-f fd-row" onClick={handleClick}>
                <ProfilePicture imgUrl={users[userId].profileImg} />
               
                {toolTipVisible?<div className="tc-white ta-center pos-f w-w-bw  w-s-n bg-c-black pad-5 br-5 mx-w-50p disp-b f-sz-15"  style={{ top:tooltipPosition.top,left:tooltipPosition.left}}>{lastMessage?.sentMessage ?? ""}</div>:""}
                <Description 
                userName={users[userId].name}
                lastMessageText={lastMessage?.sentMessage??""}
                time={lastMessage?.messageTime??""}/>

                    <span role="button" aria-label="delete-user" onClick={handleOnDelete} className="pos-r" style={{visibility:(dropDownVisibility?"visible":"hidden"),color:'rgb(134, 150, 160)'}} data-icon="down-context" >
                        <DeleteUser/>
                    </span>
            </div> 
            <ConfirmationBox isModalVisible={isModalVisible}>
                <ConfirmationBox.Header><h1>Confirm Delete</h1></ConfirmationBox.Header>
                {/* <ConfirmationBox.Body>{""}</ConfirmationBox.Body> */}
                <ConfirmationBox.Footer>
                    <button onClick={handleCancelButton} className="confirmation-box-left-button">CANCEL</button>
                    <button onClick={handleConfirmButton} className="confirmation-box-right-button">YES</button>
                </ConfirmationBox.Footer>
            </ConfirmationBox>
        </>
    );
}