export type UserIndex = number;

export type User = {
    id:string,
    name:string,
    profileImg:string,
};

export type Message = {
    sentMessage:string,
    messageTime:string,
};


export type AddUser = "ADD-USER";
export type DeleteUser = "DELETE-USER";
export type DeleteMessage = "DELETE-MESSAGE";
export type Hidden = "HIDDEN";
export type EditMessage = "EDIT";
export type Action = AddUser|DeleteUser|DeleteMessage|EditMessage|Hidden;