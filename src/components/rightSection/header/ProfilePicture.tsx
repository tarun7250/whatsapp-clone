import "./../../../App.css"

export default function ProfilePicture({imgUrl}:{imgUrl: string}){
    return (
            <img style={{width:"40px", height:"40px", borderRadius:"50%"}} className="fs-0" src={imgUrl} alt="DP"/>
    );
}