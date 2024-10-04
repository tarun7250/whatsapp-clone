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
        <div className="pad-t-10 pad-b-10 pad-l-16 pad-r-16 h-60 w-100p disp-f j-c-sb pos-r bg-c-gray">
            <div className="disp-f mx-w-50p a-i-c">
                <ProfilePicture imgUrl={users[activeUserId].profileImg} />
                <div className="f-sz-16 f-wt-500 pad-l-15 tw-nw oflow-hide t-oflow tc-white">
                    {users[activeUserId].name}
                </div>
            </div>
            <div className="disp-f a-i-c tc-dim-white">
                <div className="pad-8">
                    <SearchButton/>
                </div>
                <div className="pad-8">
                    <TripleDot/>
                </div>
            </div>
        </div>
    )
}