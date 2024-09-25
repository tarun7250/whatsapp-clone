import "./user.css";
//import type { UserIndex } from "../../../types/commonTypes";
import ProfilePicture from "./ProfilePicture";
import Description from "./Description";
// import { messageList } from "../../../assets/messages";
import { useContext, useState } from "react";
import { ActiveUserIdContext, SetActiveUserIdContext, useMessages, useMessagesDispatch, useUsers, useUsersDispatch } from "../../../contexts";
import ConfirmationBox from "../../confirmationBox/ConfirmationBox";
export default function User({userId}:{userId:number}){

    const activeUserId = useContext(ActiveUserIdContext);
    const setActiveUserId = useContext(SetActiveUserIdContext);
    const users = useUsers();
    const messages = useMessages();
    const usersDispatch = useUsersDispatch();
    const messagesDispatch = useMessagesDispatch();

    const [tooltipPosition,setTooltipPosition] = useState({top:0,left:0});

    const [dropDownVisibility, setDropDownVisibility] = useState(false);
    const [isModalVisible,setIsModalVisible] = useState(false);
    
    const lastMessage = messages[userId][messages[userId].length -1]??"";

    const handleMouseEnter = (event:React.MouseEvent<HTMLElement>) => {
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
            type: "REMOVEUSER",
            userId,
        })
        messagesDispatch({
            type:"REMOVEUSER",
            userId,
        })
        setActiveUserId(null);
        setIsModalVisible(false);
    };       

    return (
        <>
            <div  onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} style={{background:(userId === activeUserId?`rgb(42, 57, 66)`:`rgb(17, 27, 33)`)}} className="user" onClick={handleClick}>
                <ProfilePicture imgUrl={users[userId].profileImg} />
               
                <div className="tooltip" style={{display:(dropDownVisibility?"block":"none"),top:tooltipPosition.top,left:tooltipPosition.left}}>{lastMessage?.sentMessage ?? ""}</div>
                <Description 
                userName={users[userId].name}
                lastMessageText={lastMessage?.sentMessage??""}
                time={lastMessage?.messageTime??""}/>

                    <span onClick={handleOnDelete} style={{position:"relative", visibility:(dropDownVisibility?"visible":"hidden"),color:'rgb(134, 150, 160)'}} data-icon="down-context" >
                        <svg viewBox="0 0 30 30" width="30px" height="30px">    <path fill="currentColor" d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>
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