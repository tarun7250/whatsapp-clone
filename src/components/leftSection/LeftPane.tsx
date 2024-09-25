
// import type { UserIndex } from "../../types/commonTypes"
import SearchBar from "../searchSection/SearchBar"
import "./leftSection.css"
import User from "./user/User"
// import { CONNECTIONS } from "../../constant/connections"
import Header from "./header/Header"
import { useMessages, useUsers } from "../../contexts"
import AddUser from "./AddUser"
import useLocalStorage from "../../customHooks/useLocalStorage"
import { useEffect } from "react"

export default function LeftPane() {
    const users = useUsers();
    const messages = useMessages();
    const {setLocalStorage} = useLocalStorage();

    useEffect(() => {

        setLocalStorage(users, messages);
        return () => {
        }
    }, [setLocalStorage, users, messages]);
    return (
        <div className="left-pane">
            <Header />
            <SearchBar />
            <div className="left-connections-wrapper">
                {users.length === 0?"No Conversations Yet":""}
                {
                    users.map((_item, index) => {
                        return <User key={index} userId={index}/>
                    })
                }
            </div>
            <AddUser/>

        </div>
    )
}
