export type UserIndex = number;
export type User = {
    id:string,
    name:string,
    profileImg:string,
    lastMessage:string,
};

export type Message = {
    sentMessage:string,
    messageTime:string,
};



type UsersPayloads = {
    SET_LAST_MESSAGE: { lastMessage: string, activeUserId: number },
    ADD_USER: { userName: string },
    REMOVE_USER: { userId: number },
    LOCAL_USERS: {users: Array<User>},
  };
  


export type UsersAction<T extends keyof UsersPayloads> = {
type: T;
} & UsersPayloads[T];

export type AnyUsersAction = UsersAction<"ADD_USER"> | UsersAction<"REMOVE_USER"> | UsersAction<"SET_LAST_MESSAGE"> | UsersAction<"LOCAL_USERS">;


type MessagesPayloads = {
    ADD_MESSAGE: {lastMessage: string, activeUserId: number},
    DELETE_MESSAGE: {messageId: number, activeUserId: number},
    EDIT_MESSAGE: {newMessage: string, messageId: number, activeUserId: number},
    REMOVE_USER: {userId: number}
    LOCAL_MESSAGES: {messages: Array<Array<Message>>}
};

export type MessagesAction<T extends keyof MessagesPayloads> = {
    type: T;
} & MessagesPayloads[T];

export type AnyMessagesACtion = MessagesAction<"ADD_MESSAGE"> | MessagesAction<"DELETE_MESSAGE"> | MessagesAction<"EDIT_MESSAGE"> | MessagesAction<"REMOVE_USER"> | MessagesAction<"LOCAL_MESSAGES"> | {type: "ADD_USER"};



//export type MessagesActionTypes = "ADD_MESSAGE" | "DELETE_MESSAGE" | "EDIT_MESSAGE";

export type ADD_USER = "ADD-USER";
export type DeleteUser = "DELETE-USER";
export type DELETE_MESSAGE = "DELETE-MESSAGE";
export type Hidden = "HIDDEN";
export type EDIT_MESSAGE = "EDIT";
export type Action = ADD_USER|DeleteUser|DELETE_MESSAGE|EDIT_MESSAGE|Hidden;