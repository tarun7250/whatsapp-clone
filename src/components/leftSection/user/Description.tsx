import { useContext } from "react";
import { CompactContext } from "../../../contexts";
import "./../../../App.css"


export default function Description({ userName, lastMessageText, time }: { userName: string, lastMessageText: string, time: string }) {
    const compactMode = useContext(CompactContext);

    return (
        <div className="h-72 pad-r-15 tc-white disp-f fd-col j-c-c fg-1 oflow-hide">
            <div className="disp-f fd-row j-c-sb w-100p t-oflow">
                <span className="f-wt-400 f-sz-16 tw-nw t-oflow oflow-hide">
                    {userName}
                </span>
                <span  className="f-sz-12 tc-gray">
                    {time}
                </span>
            </div>
            {
            compactMode?<span className="f-sz-14 clamp-three-lines w-w-bw oflow-w-bw disp-wkb tc-gray t-oflow oflow-hide">
                {lastMessageText}
            </span>:null
        }
        </div>
    );
}