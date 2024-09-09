import "./header.css"

export default function ProfilePicture({imgUrl}:{imgUrl: string}){
    return (
        // <div className="profile-picture">
            <img className="right-header-profile-image" src={imgUrl} alt="DP"/>
        // </div>
    );
}