import { useState } from "react";
import "./App.css";
import LeftPane from "./components/left_section/LeftPane";
import RightPane from "./components/right_section/RightPane";
import type { UserIndex } from "./types/commonTypes";
import DefaultPage from "./components/right_section/default/DefaultPage";


function App() {
  const [userId, setUserId] = useState<UserIndex|null>(null);
  const [currentMessage,setCurrentMessage] = useState("");
  const [makeRerender,setMakeRerender] = useState(false);
  return (
    <div className="container">
      <LeftPane userId={userId} setUserId={setUserId}/>
      {typeof userId === "number"?
      <RightPane userId={userId} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} makeRerender={makeRerender} setMakeRerender={setMakeRerender}/>
   :<DefaultPage/>}
      </div>
  );
}

export default App;
/**
 * div.content 
 * maxwidth  1700px
 * flex direction row
 */

/**
 * left pane -  min-width 336.594px
 */

/**
 * right pane - min-width 411.406px
 */

/**
 * components
 *  leftsection
 *    leftpane
 *    header
 *    notification
 *    searchbar
 *    users
 * 
 *  rightsection
 *    header
 *    message
 *    input
 *    
 * 
 *    
 * appjs - state user id
 */

/**
 * User
 * profilepicture
 * description
 *  Username
 *  lastmessage
 * timeofmessage
 */

/**
 * border-bottom-color rgb(209, 215, 219)
 * 16px 12px
 */

/**
 * 71 57
 * 53 19
 */