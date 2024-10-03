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
        <div className="fg-1 disp-f fd-col-r oflow-s">
            <div className="h-f-c">
                {
                    messages[activeUserId].map((_item,index)=>{
                        return <Message key={index} activeUserId={activeUserId} messageIndex = {index} />
                    })
                }
            </div>
        </div>
    )
}