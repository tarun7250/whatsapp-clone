import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../../App";


describe("message sending test", ()=> {
    test("send message", async ()=> {
        render(<App/>);
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        expect(ADD_USERButton).toBeInTheDocument();


        //adding user
        userEvent.click(ADD_USERButton);
        
        const modalInput = await screen.findByRole("modal-input");
        expect(modalInput).toBeInTheDocument();
        
        const saveButton = await screen.findByRole("button",{
            name:"SAVE",
        });
        expect(saveButton).toBeInTheDocument();

        const userName = "USER MESSAGE TEST";
        await userEvent.type(modalInput,userName)
        expect(modalInput).toHaveValue(userName);

        
        await userEvent.click(saveButton);
        

        const user1 = await screen.findByText(userName);
        expect(user1).toBeInTheDocument();

        await userEvent.click(user1);

        
        const messageInput = await screen.findByRole("message-input");
        expect(messageInput).toBeInTheDocument();

        const message = "random message";
        await userEvent.type(messageInput,message);

        const sendMessageButton = screen.getByRole("button", {
            name:"send-message",
        });
        expect(sendMessageButton).toBeInTheDocument();


        await userEvent.click(sendMessageButton);
        const messageBox = await screen.findAllByText(message);
        expect(messageBox).toHaveLength(2);//user last message and message box  

    })



   
})
