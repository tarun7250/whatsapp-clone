import { useState } from "react";
import "./App.css";
import LeftPane from "./components/leftSection/LeftPane";
// import RightPane from "./components/right_section/RightPane";
// import { type Message, type User } from "./types/commonTypes";
// import DefaultPage from "./components/right_section/default/DefaultPage";

import { SetActiveUserIdContext, CompactContext, SetCompactContext, ActiveUserIdContext } from "./contexts";
import DefaultPage from "./components/rightSection/default/DefaultPage";
import RightPane from "./components/rightSection/RightPane";
import UsersProvider from "./contexts/UsersContext";
import MessagesProvider from "./contexts/MessagesContext";



function App() {

  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [compactMode, setCompactMode] = useState<boolean>(true);


  return (
    <div className="container">



      <ActiveUserIdContext.Provider value={activeUserId}>
        <UsersProvider>
          <MessagesProvider>
            <SetActiveUserIdContext.Provider value={setActiveUserId}>
              <CompactContext.Provider value={compactMode}>


                <SetCompactContext.Provider value={setCompactMode}>
                  <LeftPane />
                </SetCompactContext.Provider>

                {(activeUserId === null) ? <DefaultPage /> : <RightPane />}


              </CompactContext.Provider>
            </SetActiveUserIdContext.Provider>
          </MessagesProvider>

        </UsersProvider>
      </ActiveUserIdContext.Provider>

    </div>
  );
}

export default App;
