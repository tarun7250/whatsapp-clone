import "./../../../App.css"

export default function ProfilePicture({imgUrl}:{imgUrl: string}){
    return (
            <img className="w-40 h-40 br-50p fs-0" src={imgUrl} alt="DP"/>
    );
}