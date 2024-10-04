import "./../../../App.css"
import { CONNECTIONS } from "../../../constant/connections"
import { useContext } from "react"
import { SetCompactContext } from "../../../contexts"
import AddChat from "./../../../assets/AddChat";
import TripleDot from "../../../assets/TripleDot";
export default function Header() {
    const setCompactMode = useContext(SetCompactContext);

    const handleChange = () => {
        setCompactMode((mode)=>{return !mode});
    }
    return (
        <div className="h-60 w-100p disp-f j-c-sb pos-r fs-0 pad-t-0 pad-r-25 pad-b-0 pad-l-20">
            <div className="disp-f  mx-w-50p a-i-c">
                <img className="fs-0 br-50 w-40 h-40" src={CONNECTIONS[0].profileImg} />
                <div className="pad-l-15 f-wt-500 f-sz-16 tw-nw oflow-hide t-oflow tc-white ">
                    Self User
                </div>
            </div>
            <div className="disp-f a-i-c tc-gray">
                    compact<input onChange={handleChange} type="checkbox"/>
                <div className="pad-8">
                    <span data-icon="new-chat-outline" >
                        <AddChat/>
                    </span>
                </div>
                <div className="pad-8">
                    <span data-icon="menu" >
                        <TripleDot/>
                    </span>
                </div>
            </div>
        </div>
    )
}