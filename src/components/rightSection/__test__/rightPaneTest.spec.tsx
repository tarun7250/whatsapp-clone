import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RightPane from "../RightPane";
import { useState } from "react";
import { CompactContext, MessagesContext, MessagesDipatchContext, SetCompactContext, UsersContext, UsersDipatchContext } from "../../../contexts";
import ActiveUserContextProvider from "../../../contexts/ActiveUserContext";
import { ADD_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE } from "../../../constant/actions";
import { AnyMessagesAction } from "../../../types/commonTypes";



const  RightPaneWithContext = () => {
    const [activeUserId, setActiveUserId] = useState<number | null>(0);
    const [compactMode, setCompactMode] = useState<boolean>(true);

    const userDispatch = ()=>{}
    
    const users = [{"id":"user_id_0","name":"user","profileImg":"imgurl","lastMessage":"random message"}]
    

    const [messages, setMessages] = useState([[{ messageTime: "12:00", sentMessage: "random" }]]);

    
    const messageDispatch:React.Dispatch<AnyMessagesAction> = (action) => {
        switch (action.type) {
          case ADD_MESSAGE:
            setMessages(messages.map((messageList, index)=> {
                if(index === action.activeUserId) {
                    return [...messageList,{
                        messageTime: "12:00",
                        sentMessage: action.lastMessage,
                    }];
                }
                else{
                    return messageList;
                }
            }));
            break;
          case EDIT_MESSAGE:
            setMessages(messages.map((messageList, index)=>{
                if(index === action.activeUserId) {
                    return messageList.map((message,index)=>{
                        if(index === action.messageId){
                            message.sentMessage = action.newMessage;
                        }
                        return message;
                    })
                }
                return messageList;
            }));
            break;
          case DELETE_MESSAGE:
            setMessages(messages.map((messageList, index)=>{
                if(index === action.activeUserId) {
                    return messageList.filter((_message,index)=>{
                        return (index != action.messageId);
                    })
                }
                return messageList;
            }));
            break;
          default:
            break;
        }
      };

    return (
        
        <ActiveUserContextProvider value={{ activeUserId, setActiveUserId }}>
            <UsersContext.Provider value = {users}> 
            <UsersDipatchContext.Provider value = {userDispatch}>
                
                <MessagesContext.Provider value = {messages}> 
                <MessagesDipatchContext.Provider value = {messageDispatch}>
                
                    <CompactContext.Provider value = {compactMode}> 
                        <SetCompactContext.Provider value = {setCompactMode}>
                            
                            <RightPane/>
                        
                        </SetCompactContext.Provider>
                    </CompactContext.Provider>

                </MessagesDipatchContext.Provider>
                </MessagesContext.Provider>

            </UsersDipatchContext.Provider>
            </UsersContext.Provider>
        </ActiveUserContextProvider>
        
    );
};

describe("right pane modal tests",()=> {
    test("delete message modal", async ()=>{
        render(<RightPaneWithContext/>);
        
        const newMessage = "delete modal message";
        const messageInput = screen.getByTestId("message-input");
        await userEvent.type(messageInput,newMessage);
        const sendButton = screen.getByTestId("send-message");
        await userEvent.click(sendButton);
        const messageDisplay = screen.getByText(newMessage);
        await userEvent.hover(messageDisplay);
        const deleteMessage = screen.getByTestId("delete-message");
        await userEvent.click(deleteMessage);
        const confirmDeleteButton = screen.getByTestId("confirm-change");
        const cancelButton = screen.getByTestId("cancel-button");
        expect(confirmDeleteButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });
    test("edit message modal", async ()=> {
        render(<RightPaneWithContext/>);
        
        const newMessage = "edit modal message";
        const messageInput = screen.getByTestId("message-input");
        await userEvent.type(messageInput,newMessage);
        const sendButton = screen.getByTestId("send-message");
        await userEvent.click(sendButton);
        const messageDisplay = screen.getByText(newMessage);
        await userEvent.hover(messageDisplay);
        const editMessageButton = screen.getByTestId("edit-message");
        await userEvent.click(editMessageButton);
        const modalInput = screen.getByTestId("modal-input");
        const confirmEditButton = screen.getByTestId("confirm-change");
        const cancelButton = screen.getByTestId("cancel-button");
        expect(modalInput).toBeInTheDocument();
        expect(confirmEditButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    })

})


describe("RightPane Test", ()=> {

    test("adding message in right pane test", async ()=> {
        render(<RightPaneWithContext/>);
        
        const newMessage = "new message";
        const messageInput = screen.getByTestId("message-input");
        await userEvent.type(messageInput,newMessage);
        const sendButton = screen.getByTestId("send-message");
        await userEvent.click(sendButton);
        const messageDisplay = screen.getByText(newMessage);
        expect(messageDisplay).toBeInTheDocument()

    })

    test("deleting message in right pane test", async ()=> {
        render(<RightPaneWithContext/>);
        
        const newMessage = "delete message";
        const messageInput = screen.getByTestId("message-input");
        await userEvent.type(messageInput,newMessage);
        const sendButton = screen.getByTestId("send-message");
        await userEvent.click(sendButton);
        const messageDisplay = screen.getByText(newMessage);
        await userEvent.hover(messageDisplay);
        const deleteMessage = screen.getByTestId("delete-message");
        await userEvent.click(deleteMessage);
        const confirmDelete = screen.getByTestId("confirm-change");
        await userEvent.click(confirmDelete);

        expect(messageDisplay).not.toBeInTheDocument();

    })


    test("editing message in right pane test", async ()=> {
        render(<RightPaneWithContext/>);
        
        const newMessage = "edit message";
        const editedMessage = "new edited message";
        const messageInput = screen.getByTestId("message-input");
        await userEvent.type(messageInput,newMessage);
        const sendButton = screen.getByTestId("send-message");
        await userEvent.click(sendButton);
        const messageDisplay = screen.getByText(newMessage);
        await userEvent.hover(messageDisplay);
        const editMessageButton = screen.getByTestId("edit-message");
        await userEvent.click(editMessageButton);
        const modalInput = screen.getByTestId("modal-input");
        await userEvent.type(modalInput,editedMessage);
        const confirmEdit = screen.getByTestId("confirm-change");
        await userEvent.click(confirmEdit);

        const editedMessageDisplay = screen.getByText(editedMessage);
        expect(editedMessageDisplay).toBeInTheDocument();

    })



})
