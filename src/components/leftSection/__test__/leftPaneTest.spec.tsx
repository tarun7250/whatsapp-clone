import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";


describe("left pane test", ()=> {
    test("add user", async ()=> {
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

        const userName = "USER ADD TEST";
        await userEvent.type(modalInput,userName)
        expect(modalInput).toHaveValue(userName);

        
        await userEvent.click(saveButton);
        

        const user1 = await screen.findByText(userName);
        expect(user1).toBeInTheDocument();  

    })

    test("delete user", async ()=> {
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

        const userName = "USER DELETE TEST";
        await userEvent.type(modalInput,userName)
        expect(modalInput).toHaveValue(userName);

        
        await userEvent.click(saveButton);
        

        const user1 = await screen.findByText(userName);
        expect(user1).toBeInTheDocument();  

        await userEvent.hover(user1);

        const deleteUserButton = await screen.findByRole("button", {
            name: "delete-user"
        })
        expect(deleteUserButton).toBeInTheDocument();

        await userEvent.click(deleteUserButton);

        const confirmDeleteButton = await screen.findByRole("button", {
            name:"YES"
        })
        expect(confirmDeleteButton).toBeInTheDocument();

        await userEvent.click(confirmDeleteButton);
        expect(user1).not.toBeInTheDocument();
    })
})
