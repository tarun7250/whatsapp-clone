import { useEffect, useState } from "react";
import "./App.css";
import LeftPane from "./components/leftSection/LeftPane";
// import RightPane from "./components/right_section/RightPane";
import { type Message, type User } from "./types/commonTypes";
// import DefaultPage from "./components/right_section/default/DefaultPage";

import useLocalStorage from "./customHooks/useLocalStorage";
import { UsersContext, SetUsersContext, MessagesContext, SetMessagesContext, ActiveUserIdContext, SetActiveUserIdContext, CompactContext, SetCompactContext } from "./contexts";
import DefaultPage from "./components/rightSection/default/DefaultPage";
import RightPane from "./components/rightSection/RightPane";


function App() {
  const { getUsersFromLocalStorage, getMessagesFromLocalStorage, setLocalStorage } = useLocalStorage();

  const [users, setUsers] = useState<Array<User>>(getUsersFromLocalStorage());
  const [messages, setMessages] = useState<Array<Array<Message>>>(getMessagesFromLocalStorage());
  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [compactMode, setCompactMode] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setLocalStorage(users, messages);
    }
  }, [users, messages, setLocalStorage]);

  return (
    <div className="container">

      <SetUsersContext.Provider value={setUsers}>
        <SetMessagesContext.Provider value={setMessages}>
          <ActiveUserIdContext.Provider value={activeUserId}>
            <SetActiveUserIdContext.Provider value={setActiveUserId}>
              <MessagesContext.Provider value={messages}>

                <UsersContext.Provider value={users}>
                  <CompactContext.Provider value={compactMode}>
                    <SetCompactContext.Provider value={setCompactMode}>
                      <LeftPane />
                    </SetCompactContext.Provider>

                  {(activeUserId === null) ? <DefaultPage /> : <RightPane />}
                  </CompactContext.Provider>
                </UsersContext.Provider>

              </MessagesContext.Provider>
            </SetActiveUserIdContext.Provider>
          </ActiveUserIdContext.Provider>
        </SetMessagesContext.Provider>
      </SetUsersContext.Provider>
    </div>
  );
}

export default App;
/*
By applying `position: fixed;`, the element remains fixed relative to the viewport.
Utilizing `top: 50%;` and `left: 50%;` positions the element at the center, while `transform: translate(-50%, -50%);`
 refines the centering by adjusting the position based on the element's dimensions
*/