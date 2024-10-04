import { useState, lazy, Suspense, Fragment } from "react";
import "./App.css";
import LeftPane from "./components/leftSection/LeftPane";

import DefaultPage from "./components/rightSection/default/DefaultPage";
import UsersProvider from "./contexts/UsersContext";
import MessagesProvider from "./contexts/MessagesContext";
import CompactContextProvider from "./contexts/CompactContext";
import ActiveUserContextProvider from "./contexts/ActiveUserContext";

const  RightPane = lazy(()=>import( "./components/rightSection/RightPane"));


function App() {

  const [activeUserId, setActiveUserId] = useState<number | null>(null);


  return (
    <div className="container">



      <ActiveUserContextProvider value={{activeUserId,setActiveUserId}}>
        <UsersProvider>
          <MessagesProvider>
              <CompactContextProvider>             

                <Fragment>
                    <LeftPane />

                    {(activeUserId === null) ? <DefaultPage /> : <Suspense fallback={<DefaultPage/>}><RightPane /></Suspense>}
                </Fragment>

              </CompactContextProvider> 
          </MessagesProvider>
        </UsersProvider>
      </ActiveUserContextProvider>

    </div>
  );
}

export default App;
