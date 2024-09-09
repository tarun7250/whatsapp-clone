import "./user.css";


export default function Description({ userName, lastMessage, time }: { userName: string, lastMessage: string, time: string }) {
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
                {lastMessage}
            </span>
        </div>
    );
}