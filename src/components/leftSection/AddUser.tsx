
import { useContext } from "react";
import "./left_section.css"
import { SetActionForConfirmationBox } from "../../contexts";

const AddUser = () => {

    const setActionForConfirmationBox = useContext(SetActionForConfirmationBox);

    const handleClick = () => {
        setActionForConfirmationBox("ADD-USER");
    }

    return (
        <button onClick={handleClick} className="add-user-button">
            Start new chat
        </button>
    );
};

export default AddUser;
