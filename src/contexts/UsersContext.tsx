import { ReactElement, useReducer } from "react";
import { UsersContext } from ".";
import { UsersDipatchContext } from ".";


import usersReducer from "../reducers/usersReducer";
import useLocalStorage from "../customHooks/useLocalStorage";

const UsersProvider = ({children}: {children: ReactElement}) => {

    const {getUsersFromLocalStorage} = useLocalStorage();
    const [users, userDispatch] = useReducer(usersReducer,getUsersFromLocalStorage());

    return (
        <UsersContext.Provider value = {users}> 
            <UsersDipatchContext.Provider value = {userDispatch}>
                {children}
            </UsersDipatchContext.Provider>
        </UsersContext.Provider>
    )

}



export default UsersProvider;