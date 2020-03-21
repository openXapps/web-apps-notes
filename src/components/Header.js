import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { NoteContext } from '../context/NoteProvider';
import { getLocalStorage, saveLocalStorage } from '../utilities/localstorage';
import { utoa } from '../utilities/base64';

const Header = () => {
  const {
    noteId,
    noteTitle,
    noteContent,
    isEmpty,
    isSaved,
    navbarLocked,
    onSetIsSaved,
    onNoteContentChange,
    onCopy,
    onCaseChange,
    onTrimSpaces,
    toggleNavbarLock
  } = React.useContext(NoteContext);

  // Tries to toggle the navbar
  const collapseNavBar = (ev) => {
    const currentElement = ev.target.name ? ev.target.name : '';
    // console.log ('Header: collapseNavBar.currentElement...', currentElement);
    let elToggler = document.getElementsByClassName('navbar-toggler');
    let elBar = document.getElementById('gd-navbar-content');
    if (elBar.classList.contains('show')) {
      elToggler[0].click();
    }
    toggleNavbarLock();
    // Upload button will clear current note
    if (currentElement === 'gd-navbar-upload' && noteId) onNoteContentChange('', md5(''));
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    let savedNotes = getLocalStorage('gd-notes', null, null);
    let tempNotes = [];
    savedNotes.data.forEach((v) => {
      // Update existing note
      if (noteId === v.noteId) {
        tempNotes.push({
          ...v,
          noteTitle: noteTitle,
          noteContent: utoa(noteContent),
          noteDate: new Date(),
          favourite: false
        })
      } else { tempNotes.push({ ...v }) }
    })
    // console.log('Save: notes.EDIT...', tempNotes);
    saveLocalStorage('gd-notes', tempNotes);
    onSetIsSaved(true);
  };

  // console.log ('Header: isSaved...', isSaved);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <a className="navbar-brand m-0" href="/"><i className="fas fa-home"></i></a>
      <span className="navbar-text p-0 ml-0 ml-sm-2 text-white gd-navbar-header">Quick Notes</span>
      <button
        className="navbar-toggler px-1"
        type="button"
        data-toggle="collapse"
        data-target="#gd-navbar-content"
        aria-controls="gd-navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="gd-navbar-content">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <Link
              className={navbarLocked ? 'btn btn-outline-primary w-100 disabled' : 'btn btn-outline-primary w-100'}
              to="/open"
              role="button"
              onClick={collapseNavBar}
            ><i className="fas fa-folder-open gd-nav-btn-icon"></i><span
              className="pl-1 d-lg-inline d-none"
            >Open</span></Link>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className={!(noteId) || isSaved || navbarLocked ? 'btn btn-outline-primary w-100 disabled' : 'btn btn-outline-info w-100'}
              type="button"
              disabled={!(noteId) || navbarLocked}
              onClick={handleSave}
            ><i className="fas fa-save gd-nav-btn-icon"></i><span
              className="pl-1 d-lg-inline d-none"
            >Save</span></button>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0 gd-nav-btn-save-as">
            <Link
              className={isSaved || navbarLocked ? 'btn btn-outline-primary w-100 disabled' : 'btn btn-outline-info w-100'}
              to={noteId ? `/save/${noteId}` : '/save'}
              role="button"
              onClick={collapseNavBar}
            ><i className="far fa-save gd-nav-btn-icon"></i><span
              className="pl-1 d-lg-inline d-none"
            >Save As</span></Link>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              disabled={isEmpty || navbarLocked}
              onClick={() => { onNoteContentChange('', md5('')) }}
            ><i className="fas fa-broom gd-nav-btn-icon"></i><span
              className="pl-1 d-lg-inline d-none"
            >Clear</span></button>
          </li>
          <li className="nav-item ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              disabled={isEmpty || navbarLocked}
              onClick={() => onCopy('gd-note')}
            ><i className="fas fa-copy gd-nav-btn-icon"></i><span
              className="pl-1 d-lg-inline d-none"
            >Copy</span></button>
          </li>
          <li className="nav-item dropdown ml-0 mt-2 ml-sm-2 mt-sm-0">
            <button
              className="btn btn-outline-primary dropdown-toggle w-100"
              id="gd-dropdown-toolbox"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ><i className="fas fa-toolbox gd-nav-btn-icon"></i><span
              className="pl-1 d-lg-inline d-none"
            >Tool Box</span></button>
            <div className="dropdown-menu dropdown-menu-right shadow mt-2" aria-labelledby="gd-dropdown-toolbox">
              <button
                className="dropdown-item"
                type="button"
                disabled={isEmpty || navbarLocked}
                onClick={() => { onCaseChange('UPPER') }}
              >UPPER Case</button>
              <button
                className="dropdown-item"
                type="button"
                disabled={isEmpty || navbarLocked}
                onClick={() => { onCaseChange('LOWER') }}
              >lower Case</button>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item"
                type="button"
                disabled={isEmpty || navbarLocked}
                onClick={onTrimSpaces}
              >Trim Spaces</button>
              <div className="dropdown-divider"></div>
              <Link
                className={navbarLocked ? 'dropdown-item disabled' : 'dropdown-item'}
                to="/download"
                role="button"
                onClick={collapseNavBar}
              >Download Notes</Link>
              <Link
                className={navbarLocked ? 'dropdown-item disabled' : 'dropdown-item'}
                to="/upload"
                role="button"
                name="gd-navbar-upload"
                onClick={collapseNavBar}
              >Upload Notes</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;