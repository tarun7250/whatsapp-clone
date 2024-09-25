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
    SETLASTMESSAGE: { lastMessage: string, activeUserId: number },
    ADDUSER: { userName: string },
    REMOVEUSER: { userId: number },
    LOCALUSERS: {users: Array<User>},
  };
  


export type UsersAction<T extends keyof UsersPayloads> = {
type: T;
} & UsersPayloads[T];

export type AnyUsersAction = UsersAction<"ADDUSER"> | UsersAction<"REMOVEUSER"> | UsersAction<"SETLASTMESSAGE"> | UsersAction<"LOCALUSERS">;


type MessagesPayloads = {
    ADDMESSAGE: {lastMessage: string, activeUserId: number},
    DELETEMESSAGE: {messageId: number, activeUserId: number},
    EDITMESSAGE: {newMessage: string, messageId: number, activeUserId: number},
    REMOVEUSER: {userId: number}
    LOCALMESSAGES: {messages: Array<Array<Message>>}
};

export type MessagesAction<T extends keyof MessagesPayloads> = {
    type: T;
} & MessagesPayloads[T];

export type AnyMessagesACtion = MessagesAction<"ADDMESSAGE"> | MessagesAction<"DELETEMESSAGE"> | MessagesAction<"EDITMESSAGE"> | MessagesAction<"REMOVEUSER"> | MessagesAction<"LOCALMESSAGES"> | {type: "ADDUSER"};



//export type MessagesActionTypes = "ADDMESSAGE" | "DELETEMESSAGE" | "EDITMESSAGE";

export type AddUser = "ADD-USER";
export type DeleteUser = "DELETE-USER";
export type DeleteMessage = "DELETE-MESSAGE";
export type Hidden = "HIDDEN";
export type EditMessage = "EDIT";
export type Action = AddUser|DeleteUser|DeleteMessage|EditMessage|Hidden;