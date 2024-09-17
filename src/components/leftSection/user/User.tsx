import "./user.css";
//import type { UserIndex } from "../../../types/commonTypes";
import ProfilePicture from "./ProfilePicture";
import Description from "./Description";
// import { messageList } from "../../../assets/messages";
import { useContext, useState } from "react";
import { ActiveUserIdContext, MessagesContext, SetActionForConfirmationBox, SetActiveUserIdContext, SetDeleteIdContext, UsersContext } from "../../../contexts";
export default function User({userId}:{userId:number}){
    const activeUserId = useContext(ActiveUserIdContext);
    const setUserId = useContext(SetActiveUserIdContext);
    const users = useContext(UsersContext);
    const messages = useContext(MessagesContext);
    const setDeleteId = useContext(SetDeleteIdContext);
    const setActionForConfirmationBox = useContext(SetActionForConfirmationBox);

    const lastMessage = messages[userId][messages[userId].length-1];

    const [dropDownVisibility, setDropDownVisibility] = useState(false);
    const handleMouseEnter = () => {
        setDropDownVisibility(true);
    }
    const handleMouseLeave = () => {
        setDropDownVisibility(false);
    }
    const handleOnDelete = () => {
        setDeleteId(userId);
        setActionForConfirmationBox("DELETE-USER");
    }
    const handleClick = () => {
        setUserId(userId);
        console.log(userId);
        console.log(users);
    };
    return (
        <div  onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} style={{background:(userId === activeUserId?`rgb(42, 57, 66)`:`rgb(17, 27, 33)`)}} className="user" onClick={handleClick}>
            <ProfilePicture imgUrl={users[userId].profileImg} />
            <Description 
            userName={users[userId].name}
            lastMessageText={lastMessage?.sentMessage??""}
            time={lastMessage?.messageTime??""}/>

                <span onClick={handleOnDelete} style={{position:"relative", visibility:(dropDownVisibility?"visible":"hidden"),color:'rgb(134, 150, 160)'}} data-icon="down-context" >
                    <svg viewBox="0 0 30 30" width="30px" height="30px">    <path fill="currentColor" d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>
                </span>
        </div>
    );
}