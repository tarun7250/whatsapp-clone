import { ReactElement, SetStateAction } from "react";
import { ActiveUserIdContext } from ".";
import { SetActiveUserIdContext } from ".";




const ActiveUserContextProvider = ({children, value}: {children: ReactElement,value:{activeUserId:number | null, setActiveUserId:React.Dispatch<SetStateAction<number | null>>}}) => {

    return (
        <ActiveUserIdContext.Provider value = {value.activeUserId}> 
            <SetActiveUserIdContext.Provider value = {value.setActiveUserId}>
                {children}
            </SetActiveUserIdContext.Provider>
        </ActiveUserIdContext.Provider>
    )

}

export default ActiveUserContextProvider;