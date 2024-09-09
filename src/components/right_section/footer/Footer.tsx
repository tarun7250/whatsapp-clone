import { ChangeEventHandler, KeyboardEventHandler } from "react";
import type { UserIndex } from "../../../types/commonTypes"
import "./footer.css"
import { messageList } from "../../../assets/messages";
import getTimeInHHMMFormat from "../../../utils/getCurrentTime";
export default function Footer({userId,currentMessage, setCurrentMessage}:{userId:UserIndex,currentMessage:string,setCurrentMessage:(message:string)=>void}) {
    const handleInput:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setCurrentMessage(e.target.value);
    }
    const handleClick=()=>{
        if(currentMessage.trim().length === 0){
            return;
        }
        messageList[userId].push({
            sentMessage:currentMessage,
            messageTime:getTimeInHHMMFormat(),
        })
        setCurrentMessage("");
    }
    const handleKeyPress:KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
          handleClick();
        }
      };
    return (
        <div className="footer">
            <div className="attach-files">
                <svg viewBox="0 0 30 30" height="26" width="26" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>smiley</title><path fill="currentColor" d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"></path></svg>
                <span className="plus-sign">
                    <svg viewBox="0 0 24 24" width="30" preserveAspectRatio="xMidYMid meet" shape-rendering="crispEdges"><title>plus</title><path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path></svg>
                </span>
            </div>


            <div className="message-wrapper">
                <div className="message-input-wrapper">
                    <input onKeyDown={handleKeyPress} onChange={handleInput} className="message-input" contentEditable="true" placeholder="Type a message" value={currentMessage}></input>
                </div>
                <button onClick={handleClick} className="send-button">
                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet"  version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>send</title><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
                </button>
            </div>


        </div>
    )
}

