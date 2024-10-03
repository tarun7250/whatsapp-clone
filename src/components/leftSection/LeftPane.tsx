
// import type { UserIndex } from "../../types/commonTypes"
import SearchBar from "../searchSection/SearchBar"

import User from "./user/User"
// import { CONNECTIONS } from "../../constant/connections"
import Header from "./header/Header"
import { useMessages, useUsers } from "../../contexts"
import AddUser from "./AddUser"
import useLocalStorage from "../../customHooks/useLocalStorage"
import { useEffect } from "react"
import "./../../App.css"

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
        <div className="left-pane-border fg-1 h-100p mx-w-40p disp-f fd-col fs-0 pos-r">
            <Header />
            <SearchBar />
            <div className="fb-100p oflow-y-auto">
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
