import {User, AnyUsersAction} from "../types/commonTypes";


const usersReducer = (users: Array<User>, action:AnyUsersAction) => {


    switch (action.type) {
        case "SETLASTMESSAGE": {
            return users.map((user,index)=> {
                if(index === action.activeUserId){
                    user.lastMessage = action.lastMessage;
                }
                return user;
            })
        }
        case "ADDUSER": { 
            return [...users, {
                id:"user_id_",
                name:action.userName,
                profileImg: "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
                lastMessage: "",
            }];
        }
        case "REMOVEUSER": { 
            return users.filter((_user, index)=> {
                return (index != action.userId);
            });
        }
        case "LOCALUSERS": {
            return action.users;
        }

    }
}

export default usersReducer;