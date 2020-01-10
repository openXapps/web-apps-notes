import React from 'react';

export const NoteContext = React.createContext();

const defaultNoteTitle = 'Untitled note - Save to set a title';

/**
 * ** Note Model **
 * noteId
 * noteDate
 * noteTitle
 * noteContent
 * favourite
 */

const NoteProvider = (props) => {
  const [noteId, setNoteId] = React.useState('');
  const [noteTitle, setNoteTitle] = React.useState(defaultNoteTitle);
  const [noteContent, setNoteContent] = React.useState('');
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [isSaved, setIsSaved] = React.useState(true);
  const [navbarLocked, setNavbarLocked] = React.useState(false);


  React.useEffect(() => {
    if (noteContent) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
    return () => { };
  }, [noteContent]);

  const onNoteIdChange = (v) => {
    setNoteId(v);
  };

  const onNoteTitleChange = (v) => {
    setNoteTitle(v);
  };

  const onNoteContentChange = (v) => {
    // v not empty and isEmpty true
    if (v && isEmpty) {
      setIsEmpty(false);
    }
    // v empty and isEmpty not true
    if (!v && !isEmpty) {
      setIsEmpty(true);
      setNoteId('');
      setNoteTitle(defaultNoteTitle);
    }
    setNoteContent(v);
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

  const onCaseChange = (action) => {
    if (action === 'UPPER') setNoteContent(noteContent.toUpperCase());
    if (action === 'LOWER') setNoteContent(noteContent.toLowerCase());
  };

  const onTrimSpaces = () => {
    let result = noteContent;
    // Find basic space
    result = result.replace(/\u0020{2,}/gm, ' ');
    // Find basic return or new line + space
    result = result.replace(/(\n|\r)\u0020{1,}/gm, '\n');
    // Find basic space + return or new line
    result = result.replace(/\u0020{1,}(\n|\r)/gm, '\n');
    result = result.trim();
    setNoteContent(result);
  }

  const toggleNavbarLock = (state) => {
    // console.log(`NoteProvider: toggleNavbarLock... ${state ? state : !navbarLocked}`);
    state ? setNavbarLocked(state) : setNavbarLocked(!navbarLocked);
  };

  return (
    <NoteContext.Provider
      value={{
        noteId: noteId,
        onNoteIdChange: onNoteIdChange,
        noteTitle: noteTitle,
        onNoteTitleChange: onNoteTitleChange,
        noteContent: noteContent,
        onNoteContentChange: onNoteContentChange,
        onCaseChange: onCaseChange,
        onTrimSpaces: onTrimSpaces,
        onCopy: onCopy,
        isEmpty: isEmpty,
        isSaved: isSaved,
        navbarLocked: navbarLocked,
        toggleNavbarLock: toggleNavbarLock
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;