
import Conversation from "./conversation/Conversation"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import "./../../App.css"

export default function RightPane () {
    return (
        <div style={{background:"linear-gradient(rgba(32, 44, 51, 0.5), rgba(32, 44, 51, 0.5)), url(https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png)"}} className="fg-1 h-100p disp-f fd-col mx-w-60p bgr-r-r">
            <Header/>
            <Conversation />
            <Footer />
        </div>
    )
}