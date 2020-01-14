import React from 'react';
import md5 from 'md5';

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

  const onNoteIdChange = (v) => {
    setNoteId(v);
  };

  const onNoteTitleChange = (v) => {
    setNoteTitle(v);
  };

  /**
   * Handles note content change event
   * @param {string} noteValue Current note content
   * @param {string} noteHashPrevious MD5 hash key of previous note content
   */
  const onNoteContentChange = (noteValue, noteHashPrevious) => {
    const noteHashCurrent = md5(noteValue);
    // console.log('NoteProvider: onNoteContentChange.MD5.previous...', noteHashPrevious);
    // console.log('NoteProvider: onNoteContentChange.MD5.current....', noteHashCurrent);
    // Note hash keys match and not saved
    if ((noteHashCurrent === noteHashPrevious) && !isSaved) setIsSaved(true);
    // Note hash keys mismatch and saved
    if ((noteHashCurrent !== noteHashPrevious) && isSaved) setIsSaved(false);
    // noteValue not empty and isEmpty true
    if (noteValue && isEmpty) setIsEmpty(false);
    // noteValue empty and isEmpty not true
    if (!noteValue && !isEmpty) {
      setIsEmpty(true);
      setIsSaved(true);
      setNoteId('');
      setNoteTitle(defaultNoteTitle);
    }
    setNoteContent(noteValue);
  };

  const onSetIsSaved = (state) => {
    setIsSaved(state);
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
    setIsSaved(false);
  };

  const onTrimSpaces = () => {
    let result = noteContent;
    const resultHash = md5(result);
    // console.log('NoteProvider: resultHash.before...', resultHash);
    // Find basic space
    result = result.replace(/\u0020{2,}/gm, ' ');
    // Find basic return or new line + space
    result = result.replace(/(\n|\r)\u0020{1,}/gm, '\n');
    // Find basic space + return or new line
    result = result.replace(/\u0020{1,}(\n|\r)/gm, '\n');
    result = result.trim();
    // console.log('NoteProvider: resultHash.after....', md5(result));
    if (resultHash !== md5(result)) {
      setIsSaved(false);
      setNoteContent(result);
    }
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
        onSetIsSaved: onSetIsSaved,
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