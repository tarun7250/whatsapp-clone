import { useRef, useState } from "react";
import "./App.css";
import LeftPane from "./components/leftSection/LeftPane";
// import RightPane from "./components/right_section/RightPane";
import { Action, type Message, type User } from "./types/commonTypes";
// import DefaultPage from "./components/right_section/default/DefaultPage";

import useLocalStorage from "./customHooks/useLocalStorage";
import useEffectOnce from "./customHooks/useEffectOnce";
import { UsersContext, SetUsersContext, MessagesContext, SetMessagesContext, ActiveUserIdContext, SetActiveUserIdContext, ActionForConfirmationBox, SetActionForConfirmationBox, DeleteIdContext, SetDeleteIdContext, SelectedMessageContext, SetSelectedMessageContext } from "./contexts";
import { CONNECTIONS } from "./constant/connections";
import { messageList } from "./assets/messages";
import ConfirmationBox from "./components/confirmationBox/ConfirmationBox";
import DefaultPage from "./components/rightSection/default/DefaultPage";
import RightPane from "./components/rightSection/RightPane";


function App() {
  const [users, setUsers] = useState<Array<User>>(CONNECTIONS);
  const [messages, setMessages] = useState<Array<Array<Message>>>(messageList);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [actionForConfirmationBox, setActionForConfirmationBox] = useState<Action>("HIDDEN");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<number|null>(null); 
  // const ref = useRef({messages});

  // const [getUsersFromLocalStorage, getMessagesFromLocalStorage, setLocalStorage] = useLocalStorage();

  // useEffectOnce(()=>{

  //   setUsers(getUsersFromLocalStorage());
  //   setMessages(getMessagesFromLocalStorage());

  //   return ()=>{
  //     setLocalStorage(users,messages);
  //   }
  // },[]);

  return (
    <div className="container">

      <SetActionForConfirmationBox.Provider value={setActionForConfirmationBox}>
        <SetDeleteIdContext.Provider value={setDeleteId}>
          <SetUsersContext.Provider value={setUsers}>
            <SetMessagesContext.Provider value={setMessages}>
              <SetSelectedMessageContext.Provider value = {setSelectedMessage}>
                <ActiveUserIdContext.Provider value={activeUserId}>
                    <SetActiveUserIdContext.Provider value={setActiveUserId}>

              
              <SelectedMessageContext.Provider value = {selectedMessage}>
                <ActionForConfirmationBox.Provider value={actionForConfirmationBox}>
                  <DeleteIdContext.Provider value={deleteId}>
                    <ConfirmationBox />
                  </DeleteIdContext.Provider>
                </ActionForConfirmationBox.Provider>
              </SelectedMessageContext.Provider>


              <MessagesContext.Provider value={messages}>


                  <UsersContext.Provider value={users}>
                      <LeftPane />


                    {/* <DefaultPage /> */}
                    {(activeUserId === null)? <DefaultPage/> : <RightPane/> }
                  </UsersContext.Provider>


              </MessagesContext.Provider>


                    </SetActiveUserIdContext.Provider>
                </ActiveUserIdContext.Provider>
              </SetSelectedMessageContext.Provider>
            </SetMessagesContext.Provider>
          </SetUsersContext.Provider>
        </SetDeleteIdContext.Provider>
      </SetActionForConfirmationBox.Provider>
    </div>
  );
}

export default App;
/*
By applying `position: fixed;`, the element remains fixed relative to the viewport.
Utilizing `top: 50%;` and `left: 50%;` positions the element at the center, while `transform: translate(-50%, -50%);`
 refines the centering by adjusting the position based on the element's dimensions
*/