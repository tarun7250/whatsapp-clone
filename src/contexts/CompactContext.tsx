import { ReactElement, useState } from "react";
import { CompactContext } from ".";
import { SetCompactContext } from ".";




const CompactContextProvider = ({children}: {children: ReactElement}) => {

    const [compactMode, setCompactMode] = useState<boolean>(true);


    return (
        <CompactContext.Provider value = {compactMode}> 
            <SetCompactContext.Provider value = {setCompactMode}>
                {children}
            </SetCompactContext.Provider>
        </CompactContext.Provider>
    )

}

export default CompactContextProvider;