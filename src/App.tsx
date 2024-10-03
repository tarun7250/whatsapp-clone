import { useState, lazy, Suspense } from "react";
import "./App.css";
import LeftPane from "./components/leftSection/LeftPane";

import { SetActiveUserIdContext, CompactContext, SetCompactContext, ActiveUserIdContext } from "./contexts";
import DefaultPage from "./components/rightSection/default/DefaultPage";
import UsersProvider from "./contexts/UsersContext";
import MessagesProvider from "./contexts/MessagesContext";

const  RightPane = lazy(()=>import( "./components/rightSection/RightPane"));


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

                {(activeUserId === null) ? <DefaultPage /> : <Suspense fallback={<DefaultPage/>}><RightPane /></Suspense>}


              </CompactContext.Provider>
            </SetActiveUserIdContext.Provider>
          </MessagesProvider>

        </UsersProvider>
      </ActiveUserIdContext.Provider>

    </div>
  );
}

export default App;
