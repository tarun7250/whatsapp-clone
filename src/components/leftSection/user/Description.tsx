import { useContext } from "react";
import "./user.css";
import { CompactContext } from "../../../contexts";


export default function Description({ userName, lastMessageText, time }: { userName: string, lastMessageText: string, time: string }) {
    const compactMode = useContext(CompactContext);

    return (
        <div className="description">
            <div className="top-description">
                <span className="user-name">
                    {userName}
                </span>
                <span className="time">
                    {time}
                </span>
            </div>
            {
            compactMode?<span className="last-message">
                {lastMessageText}
            </span>:null
        }
        </div>
    );
}