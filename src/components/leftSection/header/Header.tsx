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
        <div style={{height: "59px", padding:"0px 25px 0px 20px"}} className="w-100p disp-f j-c-sb pos-r fs-0">
            <div className="disp-f  mx-w-50p a-i-c">
                <img style={{width:"40px", height:"40px", borderRadius:"50%"}} className="fs-0" src={CONNECTIONS[0].profileImg} />
                <div style={{fontSize:"16px", fontWeight:500, paddingLeft:"15px"}} className="tw-nw oflow-hide t-oflow tc-white ">
                    Self User
                </div>
            </div>
            <div className="disp-f a-i-c tc-gray">
                    compact<input onChange={handleChange} type="checkbox"/>
                <div style={{padding: "8px"}}>
                    <span data-icon="new-chat-outline" >
                        <AddChat/>
                    </span>
                </div>
                <div style={{padding: "8px"}}>
                    <span data-icon="menu" >
                        <TripleDot/>
                    </span>
                </div>
            </div>
        </div>
    )
}