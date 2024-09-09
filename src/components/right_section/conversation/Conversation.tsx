import "./conversation.css";
import Message from "./Message";
import { messageList } from "../../../assets/messages";

export default function Conversation({userId, makeRerender, setMakeRerender}:{userId:number, makeRerender:boolean ,setMakeRerender: (makeRerender:boolean)=>void }) {
    return (
        <div className="conversation">
            <div className="conversation-scroll">
                {
                    messageList[userId].map((item,index)=>{
                        return <Message key={index} userId={userId} index={index} sentMessage={item.sentMessage} messageTime={item.messageTime} makeRerender={makeRerender} setMakeRerender={setMakeRerender}/>
                    })
                }
            </div>
        </div>
    )
}