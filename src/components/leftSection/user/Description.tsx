import "./user.css";


export default function Description({ userName, lastMessageText, time }: { userName: string, lastMessageText: string, time: string }) {
    return (
        <div className="description">
            <div className="top-description">
                <span className="user-name">
                    {userName}
                </span>
                <span className="time">
                    {time}
                </span>
            </div>
            <span className="last-message">
                {lastMessageText}
            </span>
        </div>
    );
}