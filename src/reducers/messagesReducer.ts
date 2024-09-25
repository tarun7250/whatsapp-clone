import {Message, AnyMessagesACtion} from "../types/commonTypes";
import getTimeInHHMMFormat from "../utils/getCurrentTime";


const messagesReducer = (messages: Array<Array<Message> >, action:AnyMessagesACtion) => {


    switch (action.type) {
        case "ADDMESSAGE" : {
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
        case "DELETEMESSAGE" : {
            return messages.map((messageList, index)=>{
                if(index === action.activeUserId) {
                    return messageList.filter((_message,index)=>{
                        return (index != action.messageId);
                    })
                }
                return messageList;
            });
        }
        case "EDITMESSAGE" : {
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
        case "ADDUSER": {
            return [...messages,[]];
        }
        case "REMOVEUSER": {
            return messages.filter((_messageList, index)=>{
                return (index != action.userId);
            })
        }
        case "LOCALMESSAGES": {
            return action.messages;
        }
        

    }
}

export default messagesReducer;