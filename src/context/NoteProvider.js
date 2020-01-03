import React from 'react';

export const NoteContext = React.createContext();

const defaultFontSize = 24;
const defaultNoteTitle = 'Untitled note - Save to set a title';

/**
 * ** Note Model **
 * noteId
 * noteDate
 * noteTitle
 * note 
 */

const NoteProvider = (props) => {
  const [noteId, setNoteId] = React.useState('');
  const [noteTitle, setNoteTitle] = React.useState(defaultNoteTitle);
  const [note, setNote] = React.useState('');
  const [size, setSize] = React.useState(defaultFontSize);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [isSaved, setIsSaved] = React.useState(true);
  const [navbarLocked, setNavbarLocked] = React.useState(false);


  React.useEffect(() => {
    if (note) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
    return () => { };
  }, [note]);

  const onNoteIdChange = (v) => {
    setNoteId(v);
  };

  const onNoteTitleChange = (v) => {
    setNoteTitle(v);
  };

  const onNoteChange = (v) => {
    // v not empty and isEmpty true
    if (v && isEmpty) {
      setIsEmpty(false);
    }
    // v empty and isEmpty not true
    if (!v && !isEmpty) {
      setIsEmpty(true);
      setSize(defaultFontSize);
      setNoteId('');
      setNoteTitle(defaultNoteTitle);
    }
    setNote(v);
  };

  const onCopy = (elementId) => {
    /* Get DOM text field */
    const el = document.getElementById(elementId);
    /* Select text in field */
    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy text in field */
    document.execCommand("copy");
  }

  const onSizeChange = (action) => {
    if (action === 'INCREASE' && size < 60) setSize(size + 4);
    if (action === 'DECREASE' && size > 12) setSize(size - 4);
  };

  const onCaseChange = (action) => {
    if (action === 'UPPER') setNote(note.toUpperCase());
    if (action === 'LOWER') setNote(note.toLowerCase());
  };

  const onTrimSpaces = () => {
    let result = note;
    // Find basic space
    result = result.replace(/\u0020{2,}/gm, ' ');
    // Find basic return or new line + space
    result = result.replace(/(\n|\r)\u0020{1,}/gm, '\n');
    // Find basic space + return or new line
    result = result.replace(/\u0020{1,}(\n|\r)/gm, '\n');
    result = result.trim();
    setNote(result);
  }

  const toggleNavbarLock = () => {
    setNavbarLocked(!navbarLocked);
  };

  // rows = value.split(/\n/);

  return (
    <NoteContext.Provider
      value={{
        noteId: noteId,
        noteTitle: noteTitle,
        note: note,
        size: size,
        isEmpty: isEmpty,
        isSaved: isSaved,
        navbarLocked: navbarLocked,
        onCopy: onCopy,
        onNoteIdChange: onNoteIdChange,
        onNoteTitleChange: onNoteTitleChange,
        onNoteChange: onNoteChange,
        onSizeChange: onSizeChange,
        onCaseChange: onCaseChange,
        onTrimSpaces: onTrimSpaces,
        toggleNavbarLock: toggleNavbarLock
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;