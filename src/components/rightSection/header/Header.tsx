import ProfilePicture from "./ProfilePicture"
import { useContext } from "react"
import { ActiveUserIdContext, useUsers } from "../../../contexts"
import SearchButton from "../../../assets/SearchButton";
import TripleDot from "../../../assets/TripleDot";
export default function Header() {
    const activeUserId = useContext(ActiveUserIdContext);
    const users = useUsers();
    if(activeUserId === null) {
        throw new Error("user Id cannot be null in Header");
    }
    return (
        <div style={{height:"59px", padding:"10px 16px 10px 16px"}} className="w-100p disp-f j-c-sb pos-r bg-c-gray">
            <div className="disp-f mx-w-50p a-i-c">
                <ProfilePicture imgUrl={users[activeUserId].profileImg} />
                <div style={{fontSize:"16px", fontWeight: 500, paddingLeft:"15px"}} className="tw-nw oflow-hide t-oflow tc-white">
                    {users[activeUserId].name}
                </div>
            </div>
            <div className="disp-f a-i-c tc-dim-white">
                <div style={{padding:"8px"}}>
                    <SearchButton/>
                </div>
                <div style={{padding:"8px"}}>
                    <TripleDot/>
                </div>
            </div>
        </div>
    )
}