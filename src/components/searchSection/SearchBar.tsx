import SearchButton from "../../assets/SearchButton";

export default function SearchBar() {
    return (
        <div className="w-100p disp-f a-i-c j-c-c fs-0" style={{paddingLeft:"12px", paddingRight:"12px", height:"49px", borderBottom:"solid 1px rgba(209, 215, 219,0.2)"}}>
            <div className="w-100p bg-c-gray br-10 disp-f a-i-c j-c-sa" style={{height:"35px"}}>
                <div className="tc-modal">
                    <SearchButton/>
                </div>
                <input className="bg-t b-0" style={{fontSize:"15px", fontWeight:100, outline:"0", width:"90%"}} contentEditable="true" placeholder="Search of start a new chat"  name="fee"></input>
            </div>
        </div>
    );
}