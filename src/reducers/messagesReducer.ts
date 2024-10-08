import {Message, AnyMessagesACtion} from "../types/commonTypes";
import getTimeInHHMMFormat from "../utils/getCurrentTime";
import { ADD_MESSAGE, ADD_USER, DELETE_MESSAGE, EDIT_MESSAGE, LOCAL_MESSAGES, REMOVE_USER } from "../constant/actions";


const messagesReducer = (messages: Array<Array<Message> >, action:AnyMessagesACtion) => {


    switch (action.type) {
        case ADD_MESSAGE : {
            return messages.map((messageList, index)=> {
                if(index === action.activeUserId) {
                    //messageList.push();
                    return [...messageList,{
                        messageTime: getTimeInHHMMFormat(),
                        sentMessage: action.lastMessage,
                    }];
                }
                else{
                    return messageList;
                }
            })
        }
        case DELETE_MESSAGE : {
            return messages.map((messageList, index)=>{
                if(index === action.activeUserId) {
                    return messageList.filter((_message,index)=>{
                        return (index != action.messageId);
                    })
                }
                return messageList;
            });
        }
        case EDIT_MESSAGE : {
            return messages.map((messageList, index)=>{
                if(index === action.activeUserId) {
                    return messageList.map((message,index)=>{
                        if(index === action.messageId){
                            message.sentMessage = action.newMessage;
                        }
                        return message;
                    })
                }
                return messageList;
            });
        }
        case ADD_USER: {
            return [...messages,[]];
        }
        case REMOVE_USER: {
            return messages.filter((_messageList, index)=>{
                return (index != action.userId);
            })
        }
        case LOCAL_MESSAGES: {
            return action.messages;
        }
        

    }
}

export default messagesReducer;