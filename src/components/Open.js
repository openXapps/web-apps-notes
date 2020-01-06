import React from 'react';
import { useHistory } from 'react-router-dom';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';

const Open = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDeleteEmpty, setIsDeleteEmpty] = React.useState(true);
  const [notes, setNotes] = React.useState([])
  const routeHistory = useHistory();
  const {
    noteId,
    onNoteIdChange,
    onNoteTitleChange,
    onNoteContentChange,
    toggleNavbarLock
  } = React.useContext(NoteContext);

  React.useEffect(() => {
    setTimeout(() => {
      setNotes(getLocalStorage('gd-notes', 'noteDate', false).data);
      setIsLoading(false);
    }, 500);
    return () => { };
  }, [])

  const handleNoteOpen = (e) => {
    // const targetId = notes[e.target.dataset.id].noteId;
    onNoteIdChange(notes[e.target.dataset.id].noteId);
    onNoteTitleChange(notes[e.target.dataset.id].noteTitle);
    onNoteContentChange(window.atob(notes[e.target.dataset.id].noteContent));
    // console.log('Open: open button...', targetId);
    // console.log('Open: open button...', window.atob(notes[e.target.dataset.id].noteContent));
    saveLocalStorage('gd-notes', notes);
    toggleNavbarLock();
    routeHistory.goBack();
  };

  const handleNoteDelete = (e) => {
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

  const handleConfirmDelete = () => {
    if (!isDeleteEmpty && notes.length > 0) {
      saveLocalStorage('gd-notes', notes);
      toggleNavbarLock();
      routeHistory.goBack();
    }
  };

  const handleCancel = () => {
    // e.preventDefault();
    toggleNavbarLock();
    routeHistory.goBack();
  };

  // console.log('Open: notes...', notes);

  return (
    <div className="container">
      <div className="border border-primary rounded-lg my-2 p-3">
        <h5 className="mb-3">Open a saved note</h5>
        {!isLoading ? (
          notes.length > 0 ? (
            <ul className="list-group mb-1">
              {notes.map((obj, index) => {
                return (
                  <li className="list-group-item p-0 bg-dark border-0 mb-2" key={index}>
                    <div className="d-flex flex-nowrap align-items-center">
                      <div className="w-100">
                        <button
                          className="btn btn-outline-primary btn-block text-left px-2"
                          type="button"
                          data-id={index}
                          onClick={handleNoteOpen}
                        >{obj.noteTitle}</button>
                      </div>
                      <div className="flex-grow-0 flex-shrink-0">
                        <div className="d-block ml-2">
                          <button
                            className="btn"
                            type="button"
                            data-id={index}
                            disabled={noteId === obj.noteId}
                            onClick={handleNoteDelete}
                          >X</button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (<div className="my-3">No saved notes found</div>)
        ) : (<div className="my-3">Loading...</div>)
        }
        <button
          className="btn btn-outline-danger"
          type="button"
          disabled={isDeleteEmpty}
          onClick={handleConfirmDelete}
        >Confirm Delete</button>
        <button
          className="btn btn-outline-warning ml-2"
          type="button"
          onClick={handleCancel}
        >Cancel</button>
      </div>
    </div >
  );
};

export default Open;