import React from 'react';

export const NotesContext = React.createContext();

const NotesProvider = (props) => {
    const [note, setNote] = React.useState('Hello World');
    const [size, setSize] = React.useState(20);

    const onNoteChange = (v) => {
        setNote(v);
    };

    return (
        <NotesContext.Provider
            value={{
                note: note,
                size: size,
                onNoteChange: onNoteChange
            }}
        >
            {props.children}
        </NotesContext.Provider>
    );
};

export default NotesProvider;