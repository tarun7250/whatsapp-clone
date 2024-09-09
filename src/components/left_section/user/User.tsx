import "./user.css";
import type { UserIndex } from "../../../types/commonTypes";
import ProfilePicture from "./ProfilePicture";
import Description from "./Description";
import { CONNECTIONS } from "../../../constant/connections";
import { messageList } from "../../../assets/messages";
export default function User({userId,setUserId,currentUserId}:{userId:UserIndex|null,setUserId:(userId:UserIndex)=>void,currentUserId: number}){
    const handleClick = () => {
        setUserId(currentUserId);
        console.log(userId,setUserId,currentUserId);
    };
    return (
        <div style={{background:userId === currentUserId?`rgb(42, 57, 66)`:`rgb(17, 27, 33)`}} className="user" onClick={handleClick}>
            <ProfilePicture imgUrl={CONNECTIONS[currentUserId].profileImg} />
            <Description 
            userName={CONNECTIONS[currentUserId].name}
            lastMessage={messageList[currentUserId][messageList[currentUserId].length-1]?.sentMessage??""}
            time={messageList[currentUserId][messageList[currentUserId].length-1]?.messageTime??""}/>
        </div>
    );
}