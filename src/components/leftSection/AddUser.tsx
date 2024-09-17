
import { useContext, useState } from "react";
import "./leftSection.css"
import { SetMessagesContext, SetUsersContext } from "../../contexts";
import ConfirmationBox from "../confirmationBox/ConfirmationBox";

const AddUser = () => {

    const setUsers = useContext(SetUsersContext);
    const setMessages = useContext(SetMessagesContext);

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
        setUsers((users)=>{
            return [...users,
                {
                    id:"user_id_",
                    name:editText,
                    profileImg: "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
                }
            ]
        });
        setMessages((messages)=>{
            return [...messages,[]];
        });
        setIsModalVisible(false);
    }

    return (
        <>
            <button onClick={handleClick} className="add-user-button">
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
