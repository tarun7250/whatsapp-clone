import {   render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppContext from "../../../contexts/AppContext";
import LeftPane from "../LeftPane";
import { useState } from "react";


const  LeftPaneWithContext = () => {
    const [activeUserId, setActiveUserId] = useState<number | null>(null);
    return (
        <AppContext activeUserId={activeUserId} setActiveUserId={setActiveUserId}>
            <LeftPane />
        </AppContext>
    );
};


describe("left pane modal tests", ()=>{
    test("add user modal", async ()=>{
        render(<LeftPaneWithContext/>);
        const addUserButton = screen.getByTestId("new-chat-button");
        await userEvent.click(addUserButton);
        const modalInput = screen.getByTestId("modal-input");
        const saveButton = screen.getByTestId("save-button");
        expect(modalInput).toBeInTheDocument();
        expect(modalInput).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        

    });
    test("delete user modal", async ()=> {
        render(<LeftPaneWithContext/>);
        const addUserButton = screen.getByTestId("new-chat-button");
        await userEvent.click(addUserButton);
        const modalInput = screen.getByTestId("modal-input");
        const saveButton = screen.getByTestId("save-button");
        const userName = "USER DELETE MODAL TEST";
        await userEvent.type(modalInput,userName)
        await userEvent.click(saveButton);

    })
})
  

describe("left pane test", ()=> {

    test("add user button", ()=>{
        render(<LeftPaneWithContext/>);
        const addUserButton = screen.getByTestId("new-chat-button");
        expect(addUserButton).toBeInTheDocument();
    });

    test("search section", ()=>{
        render(<LeftPaneWithContext/>);
        const searchBar = screen.getByTestId('chat-search-input');
        expect(searchBar).toBeInTheDocument();
    })

    test("add user", async ()=> {
        render(<LeftPaneWithContext/>);
        const addUserButton = screen.getByTestId("new-chat-button");
        await userEvent.click(addUserButton);
        
        const modalInput =  screen.getByTestId("modal-input");
        const saveButton =  screen.getByTestId("save-button")
        const userName = "USER ADD TEST";
        await userEvent.type(modalInput,userName)
        await userEvent.click(saveButton);
        const user = await screen.findByText(userName);
        expect(user).toBeInTheDocument();  


    })
    test("delete user", async ()=> {

        render(<LeftPaneWithContext/>);
        const addUserButton = screen.getByTestId("new-chat-button");
        await userEvent.click(addUserButton);
        const modalInput = screen.getByTestId("modal-input");
        const saveButton = screen.getByTestId("save-button");
        const userName = "DELETE USER TEST";
        await userEvent.type(modalInput,userName)
        await userEvent.click(saveButton);
        const user = await screen.findByText(userName);
        await userEvent.hover(user);
        const deleteUserButton = screen.getByTestId("delete-user-button");
        await userEvent.click(deleteUserButton);
        const confirmDeleteButton = screen.getByTestId("confirm-delete-user");
        await userEvent.click(confirmDeleteButton);
        expect(user).not.toBeInTheDocument();
    })
})

