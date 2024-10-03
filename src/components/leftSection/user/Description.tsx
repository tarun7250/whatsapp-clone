import { useContext } from "react";
import { CompactContext } from "../../../contexts";
import "./../../../App.css"


export default function Description({ userName, lastMessageText, time }: { userName: string, lastMessageText: string, time: string }) {
    const compactMode = useContext(CompactContext);

    return (
        <div style={{height:"72px", paddingRight: "15px"}} className="tc-white disp-f fd-col j-c-c fg-1 oflow-hide">
            <div className="disp-f fd-row j-c-sb w-100p t-oflow">
                <span style={{fontSize:"16px",fontWeight:400}} className="tw-nw t-oflow oflow-hide">
                    {userName}
                </span>
                <span style={{fontSize:"12px"}} className="tc-gray">
                    {time}
                </span>
            </div>
            {
            compactMode?<span style={{fontSize:"14px"}} className="clamp-three-lines w-w-bw oflow-w-bw disp-wkb tc-gray t-oflow oflow-hide">
                {lastMessageText}
            </span>:null
        }
        </div>
    );
}