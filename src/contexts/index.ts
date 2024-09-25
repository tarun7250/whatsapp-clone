import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { AnyMessagesACtion, AnyUsersAction, Message, User } from "../types/commonTypes";


export const UsersContext = createContext<Array<User>>([]);
export const UsersDipatchContext = createContext<React.Dispatch<AnyUsersAction>>(() => {
    throw new Error('usersdispatchcontext must be used within a provider');
});
export const SetUsersContext = createContext<(Dispatch<SetStateAction<Array<User>>>)>(() => {
    throw new Error('SetUsersContext must be used within a provider');
});

export const MessagesContext = createContext<Array<Array<Message>>>([]);
export const MessagesDipatchContext = createContext<React.Dispatch<AnyMessagesACtion>>(() => {
    throw new Error('MessagesDispatchContext must be used within a provider');
});
export const SetMessagesContext = createContext<Dispatch<SetStateAction<Array<Array<Message>>>>>(() => {
    throw new Error('SetUsersContext must be used within a provider');
}
);

export const ActiveUserIdContext = createContext<number | null>(null);
export const SetActiveUserIdContext = createContext<Dispatch<SetStateAction<number | null>>>(() => {
    throw new Error('SetActiveUsersContext must be used within a provider');
});


export const CompactContext = createContext<boolean> (false);
export const SetCompactContext =  createContext<Dispatch<SetStateAction<boolean>>>(()=>{
    throw new Error('SetCompactContext must be used within a provider');
})


export const useUsers = () => {
    return useContext(UsersContext);
}

export const useUsersDispatch = () => {
    return useContext(UsersDipatchContext);
}


export const useMessages = () => {
    return useContext(MessagesContext);
}

export const useMessagesDispatch = () => {
    return useContext(MessagesDipatchContext);
} 

