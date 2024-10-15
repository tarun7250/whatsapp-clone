import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";



describe("RightPane Test", ()=> {

    test("adding message in right pane test", async ()=> {
        render(<App/>);
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        userEvent.click(ADD_USERButton);
        const modalInput = await screen.findByRole("modal-input");
        const saveButton = await screen.findByRole("button",{
            name:"SAVE",
        });
        const userName = "MESSAGE ADD TEST";
        await userEvent.type(modalInput,userName);
        await userEvent.click(saveButton);
        const user1 = await screen.findByText(userName);
        await userEvent.click(user1);
        const messageInput = await screen.findByRole('message-input');
        const message = "random message";
        const anotherMessage = "another message";
        await userEvent.type(messageInput,message);
        const sendButton = screen.getByRole('button', { name: /send-message/i });
        await userEvent.click(sendButton);
        await userEvent.type(messageInput,anotherMessage);
        await userEvent.click(sendButton);
        const messageInChat = screen.getByText(message);
        expect(messageInChat).toBeInTheDocument();

    })

    test("deleting message in right pane test", async ()=> {
        render(<App/>);
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        userEvent.click(ADD_USERButton);
        const modalInput = await screen.findByRole("modal-input");
        const saveButton = await screen.findByRole("button",{
            name:"SAVE",
        });
        const userName = "MESSAGE DELETE TEST";
        await userEvent.type(modalInput,userName);
        await userEvent.click(saveButton);
        const user1 = await screen.findByText(userName);
        await userEvent.click(user1);
        const messageInput = await screen.findByRole('message-input');
        const message = "random message";
        const anotherMessage = "another message";
        await userEvent.type(messageInput,message);
        const sendButton = screen.getByRole('button', { name: /send-message/i });
        await userEvent.click(sendButton);
        await userEvent.type(messageInput,anotherMessage);
        await userEvent.click(sendButton);
        const messageInChat = screen.getByText(message);
        await userEvent.hover(messageInChat);
        const dropdownButton = screen.getByRole('message-dropdown');
        await userEvent.click(dropdownButton);
        const deleteButton = await screen.findByRole('button',{ name: "delete" });
        await userEvent.click(deleteButton);
        const confirmButton = await screen.findByRole('button',{name: "YES"});
        await userEvent.click(confirmButton);
        const deletedMessage = screen.queryByText(message);

        expect(deletedMessage).not.toBeInTheDocument();

    })

    test("editing message in right pane test", async ()=> {
        render(<App/>);
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        userEvent.click(ADD_USERButton);
        const modalInput = await screen.findByRole("modal-input");
        const saveButton = await screen.findByRole("button",{
            name:"SAVE",
        });
        const userName = "MESSAGE EDIT TEST";
        await userEvent.type(modalInput,userName);
        await userEvent.click(saveButton);
        const user1 = await screen.findByText(userName);
        await userEvent.click(user1);
        const messageInput = await screen.findByRole('message-input');
        const message = "random message";
        const anotherMessage = "another message";
        await userEvent.type(messageInput,message);
        const sendButton = screen.getByRole('button', { name: /send-message/i });
        await userEvent.click(sendButton);
        await userEvent.type(messageInput,anotherMessage);
        await userEvent.click(sendButton);
        const messageInChat = screen.getByText(message);
        await userEvent.hover(messageInChat);
        const dropdownButton = screen.getByRole('message-dropdown');
        await userEvent.click(dropdownButton);
        const editButton = await screen.findByRole('button',{ name: "edit" });
        await userEvent.click(editButton);
        const confirmButton = await screen.findByRole('button',{name: "YES"});
        
        const editInput = await screen.findByRole("modal-input");
        const newMessage = "new message";
        await userEvent.type(editInput,newMessage);
        await userEvent.click(confirmButton);

        const editedMessage = screen.getByText(newMessage);
        expect(editedMessage).toBeInTheDocument();

    })


})
