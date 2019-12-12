import React from 'react';

export const NoteContext = React.createContext();

const NoteProvider = (props) => {
  const [note, setNote] = React.useState('');
  const [size, setSize] = React.useState(24);
  const [isEmpty, setIsEmpty] = React.useState(true);

  const onNoteChange = (v) => {
    if (v && isEmpty) {
      setIsEmpty(false);
    }
    if (!v && !isEmpty) {
      setIsEmpty(true);
    }
    setNote(v);
  };

  const onCopy = () => {
    /* Get the text field */
    const el = document.getElementById('gd-note');
    /* Select the text field */
    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
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

  // rows = value.split(/\n/);

  return (
    <NoteContext.Provider
      value={{
        note: note,
        size: size,
        isEmpty: isEmpty,
        onNoteChange: onNoteChange,
        onCopy: onCopy,
        onSizeChange: onSizeChange,
        onCaseChange: onCaseChange,
        onTrimSpaces: onTrimSpaces
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;