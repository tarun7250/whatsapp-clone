import { ReactElement, useReducer } from "react";
import { MessagesContext } from ".";
import { MessagesDipatchContext } from ".";


import messagesReducer from "../reducers/messagesReducer";
import useLocalStorage from "../customHooks/useLocalStorage";

const MessagesProvider = ({children}: {children: ReactElement}) => {

    const {getMessagesFromLocalStorage} = useLocalStorage();
    const [messages, messageDispatch] = useReducer(messagesReducer,getMessagesFromLocalStorage());

    return (
        <MessagesContext.Provider value = {messages}> 
            <MessagesDipatchContext.Provider value = {messageDispatch}>
                {children}
            </MessagesDipatchContext.Provider>
        </MessagesContext.Provider>
    )

}

export default MessagesProvider;