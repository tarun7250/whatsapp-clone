import "./conversation.css";
import Message from "./Message";
import { useContext } from "react";
import { ActiveUserIdContext, useMessages } from "../../../contexts";

export default function Conversation() {
    const activeUserId = useContext(ActiveUserIdContext);
    const messages = useMessages();
    if(activeUserId === null) {
        throw new Error("user Id cannot be null in Conversation");
    }
    return (
        <div className="conversation">
            <div className="conversation-scroll">
                {
                    messages[activeUserId].map((_item,index)=>{
                        return <Message key={index} activeUserId={activeUserId} messageIndex = {index} />
                    })
                }
            </div>
        </div>
    )
}