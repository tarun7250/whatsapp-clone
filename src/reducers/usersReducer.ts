import { ADD_USER, LOCAL_USERS, REMOVE_USER, SET_LAST_MESSAGE } from "../constant/actions";
import {User, AnyUsersAction} from "../types/commonTypes";


const usersReducer = (users: Array<User>, action:AnyUsersAction) => {


    switch (action.type) {
        case SET_LAST_MESSAGE: {
            return users.map((user,index)=> {
                if(index === action.activeUserId){
                    user.lastMessage = action.lastMessage;
                }
                return user;
            })
        }
        case ADD_USER: { 
            return [...users, {
                id:"user_id_",
                name:action.userName,
                profileImg: "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
                lastMessage: "",
            }];
        }
        case REMOVE_USER: { 
            return users.filter((_user, index)=> {
                return (index != action.userId);
            });
        }
        case LOCAL_USERS: {
            return action.users;
        }

    }
}

export default usersReducer;