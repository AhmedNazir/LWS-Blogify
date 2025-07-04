const { useState, createContext } = require("react");

export const TagContext = createContext();

export default function TagProvider({ children }) {
    const [tags, setTags] = useState([]);

    function handleTags(title) {
        if (!tags.includes(title)) {
            setTags([...tags, title]);
        } else {
            setTags(tags.filter((item) => item !== title));
        }
    }

    return (
        <TagContext.Provider value={{ tags, handleTags }}>
            {children}
        </TagContext.Provider>
    );
}
