export default function ProfilePicture({imgUrl}:{imgUrl: string}){
    return (
        <div  className="pad-l-13 pad-r-15 h-72 w-77 disp-f fd-col j-c-c">
            <img  className="w-49 h-49 br-50p" src={imgUrl} alt="DP"/>
        </div>
    );
}