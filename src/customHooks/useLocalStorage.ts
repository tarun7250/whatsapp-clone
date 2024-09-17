import { Message, User } from "../types/commonTypes";

const useLocalStorage = () => {
    
    const getUsersFromLocalStorage = () => {
        const users = JSON.parse(localStorage.getItem("users")??"[]");

        return users;
    }

    const getMessagesFromLocalStorage = () => {
        const messages = JSON.parse(localStorage.getItem("messages")??"[]");
        return messages
    }


    const setLocalStorage = (users:Array<User>, messages:Array<Array<Message>>) => {
        localStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("messages",JSON.stringify(messages));
    }

    return [getUsersFromLocalStorage, getMessagesFromLocalStorage, setLocalStorage];
}

export default useLocalStorage;