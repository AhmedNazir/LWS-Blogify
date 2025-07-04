const { createContext, useState } = require("react");

export const SortContext = createContext();

export default function SortProvider({ children }) {
    const [sort, setSort] = useState("default");

    return (
        <SortContext.Provider value={{ sort, setSort }}>
            {children}
        </SortContext.Provider>
    );
}
