import { USERS } from "../helpers/fakerHelper";

const Messages = () => {
    return (
        <div className="border-l-2 border-borderGray flex flex-col items-center gap-10 pt-10">
            <h3 className="text-2xl">Messages</h3>
            {USERS.map((user, index) => (
                <div className="profileWrapper" key={index}>
                    <img className="w-12 h-12 rounded-full" src={user.avatar} alt={user.username} />
                    <p className="profileName">{user.username}</p>
                </div>
            ))}
        </div>
    )
};

export default Messages;
