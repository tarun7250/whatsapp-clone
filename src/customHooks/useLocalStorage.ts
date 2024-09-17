const useLocalStorage = () => {

    const getLocalStorage = () => {
        const users = JSON.parse(localStorage.getItem("users")??"[]");
        const messages = JSON.parse(localStorage.getItem("messages")??"[]");

        return [users, messages];
    }

    const setLocalStorage = <T,P>(users:Array<T>, messages:Array<P>) => {
        localStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("messages",JSON.stringify(messages));
    }

    return [getLocalStorage, setLocalStorage];
}

export default useLocalStorage;