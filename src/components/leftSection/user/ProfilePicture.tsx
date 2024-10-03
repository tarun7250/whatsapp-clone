import "./../../../App.css";
export default function ProfilePicture({imgUrl}:{imgUrl: string}){
    return (
        <div style={{height:"72px", width:"77px", paddingLeft:"13px", paddingRight:"15px"}}  className="disp-f fd-col j-c-c">
            <img style={{width:"49px", height:"49px", borderRadius:"50%"}} src={imgUrl} alt="DP"/>
        </div>
    );
}