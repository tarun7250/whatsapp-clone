import { ChangeEventHandler, Dispatch, ReactNode, SetStateAction } from "react";


const ConfirmationBox = ({children,isModalVisible}:{children:ReactNode,isModalVisible:boolean}) => {

    return (
        <div className="pos-f z-10000 w-100vw h-100vh" style={{ display: (isModalVisible ? "flex" : "none"), top:"0%" }}>
            <div className="pos-f disp-f fd-col j-c-sb tc-modal h-30p w-50p z-1000000 bg-c-modal br-20 pad-10" style={{ display: (isModalVisible ? "flex" : "none") , top:"50%", left:"50%", transform:"translateX(-50%) translateY(-50%)"}}>
                {children}
            </div>
        </div>
    )
}
const Header = ({children}:{children:ReactNode})=>{

    return (
        <div className="fg-1 ta-center">
            {children}
        </div>
    )
}

const Body = ({ editText, setEditText}:{editText:string,setEditText:Dispatch<SetStateAction<string>>})=>{

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEditText(e.target.value);
    }
    return (
        <div className="fg-1 w-100p">
            <input onChange={handleInput} className="bg-c-gray tc-modal w-100p fg-1 br-10 b-0" contentEditable="true" placeholder="Type a message" value={editText}></input>
        </div>
    )
}

const Footer = ({children}:{children:ReactNode})=>{

    return (
        <div className="fg-1 disp-f fd-row j-c-fe a-i-c gap-20 pad-20  confirmationbox-footer">
            {children}
        </div>
    )
}

ConfirmationBox.Header = Header;
ConfirmationBox.Body = Body;
ConfirmationBox.Footer = Footer;
export default ConfirmationBox;