
import Conversation from "./conversation/Conversation"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import "./rightSection.css"

export default function RightPane () {
    return (
        <div className="right-pane">
            <Header/>
            <Conversation />
            <Footer />
        </div>
    )
}