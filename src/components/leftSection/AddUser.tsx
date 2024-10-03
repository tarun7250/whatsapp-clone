
import { useState } from "react";
import "./../../App.css"
import { useMessagesDispatch, useUsersDispatch } from "../../contexts";
import ConfirmationBox from "../confirmationBox/ConfirmationBox";

const AddUser = () => {

    const usersDispatch = useUsersDispatch();
    const messagesDispatch = useMessagesDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editText, setEditText] = useState("");


    const handleClick = () => {
        setEditText("");
        setIsModalVisible(true);
    }
    const handleCancelButton = () => {
        setIsModalVisible(false);
    }
    const handleConfirmButton = () => {
        usersDispatch({
            type: "ADDUSER",
            userName: editText,
        })
        messagesDispatch({
            type: "ADDUSER",
        })
        setIsModalVisible(false);
    }

    return (
        <>
            <button onClick={handleClick} className="add-user-button pos-a bg-green tc-gray w-100p pad-20 curved-box bt-bd-0 f-sz-lg">
                Start new chat
            </button>

            <ConfirmationBox isModalVisible={isModalVisible}>
                <ConfirmationBox.Header><h1>{"Enter Username"}</h1></ConfirmationBox.Header>
                <ConfirmationBox.Body editText={editText} setEditText={setEditText}/>
                <ConfirmationBox.Footer>
                    <button onClick={handleCancelButton} className="confirmation-box-left-button">CANCEL</button>
                    <button onClick={handleConfirmButton} className="confirmation-box-right-button">SAVE</button>
                </ConfirmationBox.Footer>
            </ConfirmationBox>
        </>
    );
};

export default AddUser;
