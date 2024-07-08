'use client'
import { createContext, useState } from "react";

type SearchContextProviderProps = {
    children: React.ReactNode;
}

type TSearchContext = {
    searchQuery: string;
    handleChangeSearchQuery: (newValue:string)=>void;
}

//creating context
export const SearchContext = createContext<TSearchContext | null>(null);

//yahan se state har jagah use hoga
export default function SearchContextProvider({ children }: SearchContextProviderProps) {
    const [searchQuery,setSearchQuery]=useState("");

    const handleChangeSearchQuery=(newValue:string)=>{
        setSearchQuery(newValue);
    };

    return <SearchContext.Provider
        value={{
            searchQuery,
            handleChangeSearchQuery,
        }}
    >
        {children}   {/* this is still a server componet */}
    </SearchContext.Provider>
}