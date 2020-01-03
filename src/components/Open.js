import React from 'react';
import { useHistory } from 'react-router-dom';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage } from '../utilities/localstorage';

const Open = () => {
  const [notes, setNotes] = React.useState([])
  const routeHistory = useHistory();
  const {
    toggleNavbarLock
  } = React.useContext(NoteContext);

  React.useEffect(() => {
    setTimeout(() => {
      setNotes(getLocalStorage('gd-notes', 'noteTitle').data);
    }, 700);
    return () => { };
  }, [])

  const handleNoteOpen = (e) => {
    console.log('Open: open button...');
  };

  const handleNoteDelete = (e) => {
    console.log('Open: delete button...');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    toggleNavbarLock();
    routeHistory.goBack();
  };

  console.log('Open: notes...', notes);

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
                        onClick={handleNoteOpen}
                      >{obj.noteTitle}</button>
                    </div>
                    <div className="flex-grow-0 flex-shrink-0">
                      <div className="d-block ml-2">
                        <button
                          className="btn"
                          type="button"
                          onClick={handleNoteDelete}
                        >X</button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
            <div className="my-3">Loading...</div>
          )}
        <button
          className="btn btn-outline-warning"
          type="button"
          onClick={handleCancel}
        >Cancel</button>
      </div>
    </div >
  );
};

export default Open;