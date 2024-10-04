import SearchButton from "../../assets/SearchButton";

export default function SearchBar() {
    return (
        <div className="w-100p disp-f a-i-c j-c-c fs-0 pad-l-12 pad-r-12 h-48" style={{ borderBottom:"solid 1px rgba(209, 215, 219,0.2)"}}>
            <div className="w-100p bg-c-gray br-10 disp-f a-i-c j-c-sa h-35">
                <div className="tc-modal">
                    <SearchButton/>
                </div>
                <input className="bg-t b-0 f-sz-15 f-wt-100 w-90p outline-0" contentEditable="true" placeholder="Search of start a new chat"  name="fee"></input>
            </div>
        </div>
    );
}