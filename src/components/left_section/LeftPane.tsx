
import type { UserIndex } from "../../types/commonTypes"
import SearchBar from "../search_section/SearchBar"
import "./left_section.css"
import User from "./user/User"
import { CONNECTIONS } from "../../constant/connections"
import Header from "./header/Header"

export default function LeftPane({ userId, setUserId }: { userId: UserIndex|null, setUserId: (userId: UserIndex) => void }) {
    return (
        <div className="left-pane">
            <Header />
            <SearchBar />
            <div className="left-connections-wrapper">
                {
                    CONNECTIONS.map((_item, index) => {
                        return <User key={index} userId={userId} setUserId={setUserId} currentUserId={index} />
                    })
                }
            </div>

        </div>
    )
}