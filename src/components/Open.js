import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import md5 from 'md5';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';
import { atou } from '../utilities/base64';

const NoteLabel = ({ index, noteTitle, noteDate }) => {
  return (
    <>
      <span
        data-id={index}
      >{noteTitle}</span> <span
        className="d-none d-md-inline float-right small" data-id={index}
      >{noteDate}</span>
    </>
  );
};

const Open = () => {
  const [isDeleteEmpty, setIsDeleteEmpty] = React.useState(true);
  const [notes, setNotes] = React.useState([])
  const routeHistory = useHistory();
  const focusElement = React.useRef();
  const {
    noteId,
    onNoteIdChange,
    onNoteTitleChange,
    onNoteContentChange,
    toggleNavbarLock
  } = React.useContext(NoteContext);

  React.useEffect(() => {
    // Get notes from local storage
    setNotes(getLocalStorage('gd-notes', 'noteDate', false).data);
    // Set focus to Cancel button
    focusElement.current.focus();
    // Cleanup effect
    return () => {
      // Restore navbar state
      toggleNavbarLock('unlock');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onNoteOpen = (e) => {
    // console.log('Open: e.target...', e.target);
    // const targetId = notes[e.target.dataset.id].noteId;
    const openedNote = atou(notes[e.target.dataset.id].noteContent);
    onNoteIdChange(notes[e.target.dataset.id].noteId);
    onNoteTitleChange(notes[e.target.dataset.id].noteTitle);
    // onNoteContentChange(window.atob(notes[e.target.dataset.id].noteContent));
    onNoteContentChange(openedNote, md5(openedNote));
    // console.log('Open: open button...', targetId);
    // console.log('Open: open button...', window.atob(notes[e.target.dataset.id].noteContent));
    // saveLocalStorage('gd-notes', notes);
    routeHistory.goBack();
  };

  const onNoteDelete = (e) => {
    let tempNotes = [];
    const targetId = notes[e.target.dataset.id].noteId;
    notes.map((obj, index) => {
      if (obj.noteId !== targetId) {
        tempNotes.push(obj);
      };
      return true;
    });
    // console.log('Open: delete button...', tempNotes);
    if (tempNotes.length < notes.length) setIsDeleteEmpty(false);
    setNotes(tempNotes);
  };

  const onConfirmDelete = () => {
    if (!isDeleteEmpty && notes.length > 0) {
      saveLocalStorage('gd-notes', notes);
      routeHistory.goBack();
    }
  };

  const onCancel = () => {
    routeHistory.goBack();
  };

  // console.log('Open: notes...', notes);

  return (
    <div className="container">
      <div className="border border-primary rounded-lg my-2 p-3">
        <h5 className="mb-3">Open a saved note</h5>
        {notes.length > 0 ? (
          <ul className="list-group mb-1">
            {notes.map((obj, index) => {
              return (
                <li className="list-group-item p-0 bg-dark border-0 mb-2" key={index}>
                  <div className="d-flex flex-nowrap align-items-center">
                    <div className="w-100">
                      <button
                        className="btn btn-outline-primary btn-block text-left px-2"
                        type="button"
                        disabled={noteId === obj.noteId}
                        data-id={index}
                        onClick={onNoteOpen}
                      ><NoteLabel
                          index={index}
                          noteTitle={obj.noteTitle}
                          noteDate={moment(obj.noteDate).format('ddd, MMM Do YYYY, HH:mm')} /></button>
                    </div>
                    <div className="flex-grow-0 flex-shrink-0">
                      <div className="d-block ml-2">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          data-id={index}
                          disabled={noteId === obj.noteId}
                          onClick={onNoteDelete}
                        >X</button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (<div className="my-3">No saved notes found</div>)}
        <button
          className={isDeleteEmpty ? 'btn btn-outline-light' : 'btn btn-outline-info'}
          type="button"
          disabled={isDeleteEmpty}
          onClick={onConfirmDelete}
        >Confirm Delete</button>
        <button
          className="btn btn-outline-light ml-2"
          type="button"
          ref={focusElement}
          onClick={onCancel}
        >Cancel</button>
      </div>
    </div >
  );
};

export default Open;