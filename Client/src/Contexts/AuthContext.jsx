import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
    const [isAuth, setisAuth] = useState(false);

    const loginHandler = () => {
        setisAuth(isAuth ? false : true);
    }
    return (
        <AuthContext.Provider value={{ isAuth, loginHandler }}>
            {children}
        </AuthContext.Provider>
    )
}
