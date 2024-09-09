import "./user.css";
export default function ProfilePicture({imgUrl}:{imgUrl: string}){
    return (
        <div className="profile-picture">
            <img className="profile-image" src={imgUrl} alt="DP"/>
        </div>
    );
}