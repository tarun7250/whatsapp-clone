
import type { UserIndex } from "../../types/commonTypes"
import Conversation from "./conversation/Conversation"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import "./right_section.css"

export default function RightPane ({userId,currentMessage, setCurrentMessage, makeRerender, setMakeRerender}:{userId:UserIndex,currentMessage:string,setCurrentMessage:(message:string)=>void,makeRerender:boolean ,setMakeRerender: (makeRerender:boolean)=>void }) {
    return (
        <div className="right-pane">
            <Header userId={userId}/>
            <Conversation userId={userId} makeRerender={makeRerender} setMakeRerender={setMakeRerender}/>
            <Footer userId={userId} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage}/>
        </div>
    )
}