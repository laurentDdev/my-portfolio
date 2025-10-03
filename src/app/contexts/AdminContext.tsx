"use client"
import {createContext, PropsWithChildren} from "react";



export type AdminContextType = {

}

export const AdminContext = createContext({

})
export const AdminContextProvider = ({ children} : PropsWithChildren) => {



    return (
        <AdminContext.Provider>
            {children}
        </AdminContext.Provider>
    )
}