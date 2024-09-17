import { createContext, Dispatch, SetStateAction } from "react";
import { Action, Message, User } from "../types/commonTypes";


export const UsersContext = createContext<Array<User>>([]);
export const SetUsersContext = createContext<(Dispatch<SetStateAction<Array<User>>>)>(() => {
    throw new Error('SetUsersContext must be used within a provider');
});

export const MessagesContext = createContext<Array<Array<Message>>>([]);
export const SetMessagesContext = createContext<Dispatch<SetStateAction<Array<Array<Message>>>>>(() => {
    throw new Error('SetUsersContext must be used within a provider');
}
);

export const ActiveUserIdContext = createContext<number | null>(null);
export const SetActiveUserIdContext = createContext<Dispatch<SetStateAction<number | null>>>(() => {
    throw new Error('SetActiveUsersContext must be used within a provider');
});

export const ActionForConfirmationBox = createContext<Action>("HIDDEN");
export const SetActionForConfirmationBox = createContext<Dispatch<SetStateAction<Action>>>(()=>{
    throw new Error('SetActionForConfirmationBox must be used withing a provider');
});

export const DeleteIdContext = createContext<number|null>(null);
export const SetDeleteIdContext = createContext<Dispatch<SetStateAction<number | null>>>(()=>{
    throw new Error("SetDeleteIdContext must be used within a provider");
})

export const SelectedMessageContext = createContext<number|null>(null);
export const SetSelectedMessageContext = createContext<Dispatch<SetStateAction<number | null>>>(()=>{
    throw new Error("SetSelectedMessageContext must be used within a provider");
})