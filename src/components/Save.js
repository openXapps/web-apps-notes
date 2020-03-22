import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';
import { utoa } from '../utilities/base64';

// Set focus to imput element
// https://medium.com/trabe/react-useref-hook-b6c9d39e2022

const Save = () => {
  const routeHistory = useHistory();
  const routeMatch = useRouteMatch();
  const [componentTitle, setComponentTitle] = React.useState('');
  // const [noteTitlePrevious, setNoteTitlePrevious] = React.useState('');
  const [noteTitleNew, setNoteTitleNew] = React.useState('');
  const [noteIdNew, setNoteIdNew] = React.useState(uuidv1());
  const [mode, setMode] = React.useState('NEW');
  // const [noteId, setNoteId] = React.useState('');
  const textInput = React.useRef();
  const {
    noteTitle,
    noteContent,
    onNoteIdChange,
    onNoteTitleChange,
    onSetIsSaved,
    toggleNavbarLock
  } = React.useContext(NoteContext);

  // Run once
  React.useEffect(() => {
    // setNoteTitlePrevious(noteTitle);
    // Set route mode
    if (routeMatch.path === '/save') {
      setMode('NEW');
      setComponentTitle('New note');
      // console.log('Save: noteTitlePrevious...', noteTitlePrevious);
      // console.log('Save: noteTitle.......', noteTitle);
      // Blank out input value if new note detected
      if (noteTitle === 'Untitled note - Save to set a title') setNoteTitleNew('');
    } else {
      setMode('EDIT');
      setComponentTitle('Edit note');
      setNoteTitleNew(noteTitle);
      setNoteIdNew(routeMatch.params.noteId);
    }
    // Set focus to input element
    textInput.current.focus();
    // Cleanup effect
    return () => {
      // Restore navbar state
      toggleNavbarLock('unlock');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTitleChange = (ev) => {
    setNoteTitleNew(ev.target.value);
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    let savedNotes = getLocalStorage('gd-notes', null, null);
    let tempNotes = [];
    switch (mode) {
      case 'NEW':
        savedNotes.data.push({
          noteId: noteIdNew,
          noteTitle: noteTitleNew,
          // noteContent: window.btoa(unescape(encodeURIComponent(noteContent))),
          noteContent: utoa(noteContent),
          noteDate: new Date(),
          favourite: false
        });
        // console.log('Save: notes.NEW...', savedNotes);
        saveLocalStorage('gd-notes', savedNotes.data);
        onNoteIdChange(noteIdNew);
        break;
      case 'EDIT':
        savedNotes.data.forEach((v) => {
          // Update existing note
          if (noteIdNew === v.noteId) {
            tempNotes.push({
              ...v,
              noteTitle: noteTitleNew,
              noteContent: utoa(noteContent),
              noteDate: new Date(),
              favourite: false
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
    onNoteTitleChange(noteTitleNew);
    onSetIsSaved(true);
    routeHistory.goBack();
  };

  // console.log('Save: noteTitlePrevious...', noteTitlePrevious);

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
              value={noteTitleNew}
              onChange={handleTitleChange}
              required={true}
            />
            <button
              className="btn btn-outline-light"
              type="submit"
            >Save</button>
            <button
              className="btn btn-outline-light ml-2"
              type="button"
              onClick={() => { routeHistory.goBack() }}
            >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Save;