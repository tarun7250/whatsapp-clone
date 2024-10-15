import {  ReactElement, Dispatch, SetStateAction } from 'react';
import ActiveUserContextProvider from './ActiveUserContext';
import CompactContextProvider from './CompactContext';
import MessagesProvider from './MessagesContext';
import UsersProvider from './UsersContext';
// import RightPane from '../components/rightSection/RightPane';


const AppContext = ({ children, activeUserId, setActiveUserId }: { children: ReactElement, activeUserId: number | null, setActiveUserId: Dispatch<SetStateAction<number | null>> }) => {
    //const [activeUserId, setActiveUserId] = useState<number | null>(null);

    return (
            <ActiveUserContextProvider value={{ activeUserId, setActiveUserId }}>
                <UsersProvider>
                    <MessagesProvider>
                        <CompactContextProvider>

                            {children}

                        </CompactContextProvider>
                    </MessagesProvider>
                </UsersProvider>
            </ActiveUserContextProvider>
    );
};
export default AppContext;
