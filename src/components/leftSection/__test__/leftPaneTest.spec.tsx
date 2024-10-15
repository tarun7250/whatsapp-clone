import { render, screen } from "@testing-library/react";
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
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        userEvent.click(ADD_USERButton);
        const modalInput = await screen.findByRole("modal-input");
        const saveButton = await screen.findByRole("button",{
            name:"SAVE",
        });
        expect(modalInput).toBeInTheDocument();
        expect(modalInput).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();

    });
    test("delete user modal", async ()=> {
        render(<LeftPaneWithContext/>);
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        userEvent.click(ADD_USERButton);
        const modalInput = await screen.findByRole("modal-input");
        const saveButton = await screen.findByRole("button",{
            name:"SAVE",
        });
        const userName = "USER DELETE MODAL TEST";
        await userEvent.type(modalInput,userName)
        await userEvent.click(saveButton);
        const user1 = await screen.findByText(userName);
        await userEvent.hover(user1);
        const deleteUserButton = await screen.findByRole("button", {
            name: "delete-user"
        })
        await userEvent.click(deleteUserButton);
        const confirmDeleteButton = await screen.findByRole("button", {
            name:"YES"
        })
        expect(confirmDeleteButton).toBeInTheDocument();
    })
})
  

describe("left pane test", ()=> {

    test("add user button", ()=>{
        render(<LeftPaneWithContext/>);
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        expect(ADD_USERButton).toBeInTheDocument();
    });

    test("search section", ()=>{
        render(<LeftPaneWithContext/>);
        const searchBar = screen.getByTestId('chat-search-input');
        expect(searchBar).toBeInTheDocument();
    })

    test("add user", async ()=> {
        render(<LeftPaneWithContext/>);
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        userEvent.click(ADD_USERButton);
        
        const modalInput = await screen.findByRole("modal-input");
        const saveButton = await screen.findByRole("button",{
            name:"SAVE",
        });
        const userName = "USER ADD TEST";
        await userEvent.type(modalInput,userName)
        await userEvent.click(saveButton);
        const user1 = await screen.findByText(userName);
        expect(user1).toBeInTheDocument();  

    })

    test("delete user", async ()=> {
        render(<LeftPaneWithContext/>);
        const ADD_USERButton = screen.getByRole("button",{
            name:"Start new chat",
        });
        userEvent.click(ADD_USERButton);
        const modalInput = await screen.findByRole("modal-input");
        const saveButton = await screen.findByRole("button",{
            name:"SAVE",
        });
        const userName = "USER DELETE TEST";
        await userEvent.type(modalInput,userName)
        await userEvent.click(saveButton);
        const user1 = await screen.findByText(userName);
        await userEvent.hover(user1);
        const deleteUserButton = await screen.findByRole("button", {
            name: "delete-user"
        })
        await userEvent.click(deleteUserButton);
        const confirmDeleteButton = await screen.findByRole("button", {
            name:"YES"
        })
        await userEvent.click(confirmDeleteButton);
        expect(user1).not.toBeInTheDocument();
    })
})
