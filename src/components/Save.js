import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';

// Set focus to imput element
// https://medium.com/trabe/react-useref-hook-b6c9d39e2022

const Save = () => {
  const routeHistory = useHistory();
  const routeMatch = useRouteMatch();
  const [componentTitle, setComponentTitle] = React.useState('');
  const [previousTitle, setPreviousTitle] = React.useState('');
  const [mode, setMode] = React.useState('NEW');
  const [noteId, setNoteId] = React.useState('');
  const textInput = React.useRef();
  const {
    noteTitle,
    note,
    onNoteIdChange,
    onNoteTitleChange,
    toggleNavbarLock
  } = React.useContext(NoteContext);


  // Run once
  React.useEffect(() => {
    setPreviousTitle(noteTitle);
    // Set route mode
    if (routeMatch.path === '/save') {
      setMode('NEW');
      setComponentTitle('New note');
      setNoteId(uuidv1());
      // console.log('Save: previousTitle...', previousTitle);
      // console.log('Save: noteTitle.......', noteTitle);
      if (noteTitle === 'Untitled note - Save to set a title') onNoteTitleChange('');
    } else {
      setMode('EDIT');
      setComponentTitle('Edit note');
      setNoteId(routeMatch.params.noteId);
    }
    textInput.current.focus();

    return () => true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = (e) => {
    e.preventDefault();
    let savedNotes = getLocalStorage('gd-notes', null);
    let tempNotes = [];
    switch (mode) {
      case 'NEW':
        savedNotes.data.push({
          noteId: noteId,
          noteTitle: noteTitle,
          note: window.btoa(note),
          noteDate: new Date()
        });
        // console.log('Save: notes.NEW...', savedNotes);
        onNoteIdChange(noteId);
        saveLocalStorage('gd-notes', savedNotes.data);
        break;
      case 'EDIT':
        savedNotes.data.forEach((v, i, a) => {
          // Update existing note
          if (noteId === v.noteId) {
            tempNotes.push({
              ...v,
              noteTitle: noteTitle,
              note: window.btoa(note),
              noteDate: new Date()
            })
          } else { tempNotes.push({ ...v }) }
        })
        // console.log('Save: notes.EDIT...', tempNotes);
        saveLocalStorage('gd-notes', tempNotes);
        break;
      default:
        // Nothing to do
        break;
    };

    toggleNavbarLock();
    routeHistory.goBack();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (noteTitle !== previousTitle) onNoteTitleChange(previousTitle);
    toggleNavbarLock();
    routeHistory.goBack();
  };

  // console.log('Save: previousTitle...', previousTitle);

  return (
    <div className="container">
      <div className="border border-primary rounded-lg my-2 p-3">
        <h5 className="mb-3">{componentTitle}</h5>
        <form autoComplete="off" onSubmit={handleSave}>
          <div className="form-group input-group-lg mb-0">
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Title"
              name="noteTitle"
              ref={textInput}
              value={noteTitle}
              onChange={e => onNoteTitleChange(e.target.value)}
              required={true}
            />
            <button
              className="btn btn-outline-success mr-2"
              type="submit"
            >Save</button>
            <button
              className="btn btn-outline-warning"
              type="button"
              onClick={handleCancel}
            >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Save;