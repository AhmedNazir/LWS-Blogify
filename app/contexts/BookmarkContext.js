const { createContext, useState } = require("react");

export const BookmarkContext = createContext();

export default function BookmarkProvider({ children }) {
    const [marked, setMarked] = useState([]);

    function handleMarked(id) {
        if (!marked.includes(id)) {
            setMarked([...marked, id]);
        } else {
            setMarked(marked.filter((item) => item !== id));
        }
    }

    return (
        <BookmarkContext.Provider value={{ marked, handleMarked }}>
            {children}
        </BookmarkContext.Provider>
    );
}
