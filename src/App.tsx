import { Suspense, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import "./App.css";
import LeftPane from "./components/leftSection/LeftPane";
import DefaultPage from "./components/rightSection/default/DefaultPage";
import RightPane from "./components/rightSection/RightPane";
import AppContext from "./contexts/AppContext";

function App() {
  const [activeUserId, setActiveUserId] = useState<number | null>(null);

  return (
    <div className="container">
      <AppContext activeUserId={activeUserId} setActiveUserId={setActiveUserId} >
        <Fragment>
          <LeftPane />
          {(activeUserId === null) ? <DefaultPage /> : <Suspense fallback={<DefaultPage />}><RightPane /></Suspense>}
        </Fragment>
      </AppContext>
    </div>
  );
}

export default App;
